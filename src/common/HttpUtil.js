export default class HttpUtils {

  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          // APPCODE 申请：https://market.aliyun.com/products/57096001/cmapi010812.html?spm=5176.2020520132.101.5.M9gquA#sku=yuncode481200005
          "Authorization": "APPCODE " + ''
        }
      })
        .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: this.changeData(data)
      })
        .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static changeData(obj) {
    var prop, str = "";
    var i = 0;
    for (prop in obj) {
      if (!prop) {
        return;
      }
      if (i == 0) {
        str += prop + '=' + obj[prop];
      } else {
        str += "&" + prop + '=' + obj[prop];
      }
      i++;
    }
    return str
  }
}
