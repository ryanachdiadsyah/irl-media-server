import * as _ from 'lodash';
import {SessionTypeEnum} from '../../sessions/session';

import FlvSession from '../../sessions/flvSession';
import RtmpSession from '../../sessions/rtmpSession';

export function getStreams(req, res, next) {
  const stats = [];

  for (const [, session] of this.sessions) {
    console.log(this);
    if (!session.isStarting) {
      continue;
    }

    const regRes = /\/(.+)\/(.+)/gi.exec(session.publishStreamPath || session.playStreamPath);

    if (!regRes) {
      continue;
    }

    const [, app, channel] = regRes;

    let liveApp = _.find(stats, {app});

    if (!liveApp) {
      liveApp = {
        app,
        channels: [],
      };

      stats.push(liveApp);
    }

    let liveChannel = _.find(liveApp.channels, {channel});

    if (!liveChannel) {
      liveChannel = {
        channel,
        publisher: null,
        subscribers: [],
      };

      liveApp.channels.push(liveChannel);
    }

    let duration = session.isPublishing
      ? Math.ceil((Date.now() - session.startTimestamp) / 1000)
      : 0;

    if (session.sessionType === SessionTypeEnum.PUBLISHER) {
      liveChannel.publisher = {
        app,
        channel,
        connectId: session.id,
        connectCreated: session.connectTime,
        bytes: session.stats.bytesRead,
        ip: session.stats.remoteAddress,
        protocol: 'rtmp',
        video: {
          codecId: session.videoCodec,
          codecName: session.videoCodecName,
          size: session.videoSize,
          fps: session.videoFps,
        },
        audio: {
          codecId: session.audioCodec,
          codecName: session.audioCodecName,
          profile: session.audioProfileName,
          sampleRate: session.audioSamplerate,
          channels: session.audioChannels,
        },
        duration,
        bitrate: duration > 0 ? session.bitrate : 0
      };
    }

    if (session.sessionType === SessionTypeEnum.SUBSCRIBER) {
      if (session instanceof RtmpSession) {
        liveChannel.subscribers.push({
          app,
          channel,
          connectId: session.id,
          connectCreated: session.connectTime,
          bytes: session.stats.bytesWritten,
          ip: session.stats.remoteAddress,
          protocol: 'rtmp'
        });
      }

      if (session instanceof FlvSession) {
        liveChannel.subscribers.push({
          app,
          channel,
          connectId: session.id,
          connectCreated: session.connectTime,
          bytes: session.stats.bytesWritten,
          ip: session.stats.remoteAddress,
          protocol: session.protocol
        });
      }
    }
  }

  res.json({
    stats,
  });
}
