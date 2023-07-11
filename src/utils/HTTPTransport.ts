export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method;
  data?: any;
};

function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(
    path: string,
    data?: unknown,
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(
    path: string,
    data: unknown,
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(
    url: string,
    options: Options = { method: Method.Get },
  ): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Method.Get;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => {
        return reject(new Error('abort'));
      };
      xhr.onerror = () => {
        return reject(new Error('network error'));
      };
      xhr.ontimeout = () => {
        return reject(new Error('timeout'));
      };

      if (!url.includes('avatar')) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.setRequestHeader('Content-Security-Policy', ' media-src https://yandex.ru ');
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else if (url.includes('avatar')) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
