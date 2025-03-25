import { http, HttpResponse } from 'msw';
import audioData from './audioData.mock.json';

export const handlers = [
    http.get('https://sonora-api-2oow.onrender.com/api/audio', () => {
        return HttpResponse.json(audioData);
    }),
];
