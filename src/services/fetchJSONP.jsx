// логика принятия/отправки данных с БД через JSONP
export const fetchJSONP = (url, callbackName, retries = 3) => {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNumber) => {
      const uniqueCallbackName = `jsonp_${callbackName}_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const script = document.createElement("script");

      script.src = `${url}${
        url.includes("?") ? "&" : "?"
      }callback=${uniqueCallbackName}`;

      window[uniqueCallbackName] = (data) => {
        cleanup();
        resolve(data);
      };

      script.onerror = () => {
        cleanup();
        if (attemptNumber < retries) {
          console.log(`Повторная попытка ${attemptNumber + 1}/${retries}`);
          setTimeout(() => attempt(attemptNumber + 1), 1000 * attemptNumber);
        } else {
          reject(new Error("JSONP request failed after retries"));
        }
      };

      document.head.appendChild(script);

      const timeoutId = setTimeout(() => {
        cleanup();
        if (attemptNumber < retries) {
          console.log(
            `Таймаут, повторная попытка ${attemptNumber + 1}/${retries}`
          );
          setTimeout(() => attempt(attemptNumber + 1), 1000 * attemptNumber);
        } else {
          reject(new Error("JSONP request timeout after retries"));
        }
      }, 10000);

      const cleanup = () => {
        clearTimeout(timeoutId);
        if (script.parentNode === document.head) {
          document.head.removeChild(script);
        }
        if (window[uniqueCallbackName]) {
          delete window[uniqueCallbackName];
        }
      };
    };

    attempt(1);
  });
};
