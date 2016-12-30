export function uppercase (str) {
  return str.toUpperCase()
}

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

module.exports = {
    huha: function(article){
      var urllink=[];
      var parser = new DOMParser ();
      var xmlDoc = parser.parseFromString (article, "text/html");
      var re = xmlDoc.getElementsByClassName("onebox");
      var hackpad = xmlDoc.getElementsByClassName("source");
      var youtubrlink = xmlDoc.getElementsByClassName("lazyYT");
      if(hackpad.length !== 0){
        urllink.push(hackpad[0].firstChild.nextElementSibling.href);
      }
      if(youtubrlink.length !== 0){
        urllink.push("<iframe src=https://www.youtube.com/embed/"+youtubrlink[0].dataset.youtubeId+" width="+youtubrlink[0].dataset.width+" height="+youtubrlink[0].dataset.height+"><\/iframe>");
      }
      if(re.length!==0){
        for(var i=0; i< re.length; i++){
          urllink.push(re[i].href);
        }               
      }      
    return urllink;
    }
};

