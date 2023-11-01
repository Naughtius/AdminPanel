/**
 * Асинхронно искусственно делает задержку по времени
 *
 * @param ms - время задержки в ms
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
