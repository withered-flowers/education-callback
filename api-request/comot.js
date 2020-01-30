const requestDataViaAjax = (cb) => {
    let xhr = new XMLHttpRequest();
    let url = "https://jsonplaceholder.typicode.com/users/1";

    xhr.open('GET', url);
  
    xhr.onload = () => {
      if(xhr.status === 200) {
        cb(xhr.responseText);
      }
      else {
        cb(null);
      }
    }
  
    xhr.send();
  }
  
  const showResult = (data) => {
    if (data != null) {
      data = JSON.parse(data);
      console.log(data);
    }
  }
  
  requestDataViaAjax(showResult);