/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var googleapis = require('../lib/googleapis.js');

googleapis
  .discover('urlshortener', 'v1')
  .execute(function(err, client) {
    // example request designed to return success
    var req1 = client.urlshortener.url.get({ shortUrl: 'http://goo.gl/DdUKX' });

    // example request designed to return an error
    var req2 = client.urlshortener.url.get({ shortUrl: 'http://goo.gl/DdUdX' });

    //build a batch request and execute
    client.newBatchRequest()
      .add(req1)
      .add(req2)
      .execute(function(err, results) {
        if (err) {
          console.log("Error", err);
          return
        }
        results.forEach(function(i, v) {
          console.log('Response longUrl #', i + 1, ':', v);
        });
    });
});
