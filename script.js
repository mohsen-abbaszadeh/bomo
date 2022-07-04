var injectScript, closeBtn, resultBox, inputBox;

function parseData(data){
  console.log(injectScript);
  if(injectScript){
     console.log('remove script');
     document.head.removeChild(injectScript);
     injectScript = null;
  }
  console.log('parse data1 ' + data[1] + data[1].length);
  
  if(data[1].length == 0){
    inputBox.value = 'Sorry, no result found';
    inputBox.blur();
    
  }else{
     resultBox.style.display = 'block';
     resultBox.classList.add('open') ;
    
    //resultTitle = data[1];
    //resultSnippet = data[2];
    //resultUrl = data[3];
    appendEl(data[1],data[2],data[3]);
  
  }
  
       
}

function appendEl(resultTitle, resultSnippet, resultUrl){
  for(var i=0; i<resultTitle.length; i++){
    
    resultBox.appendChild(
      el('div', {'className':'resultBox'})
       .appendChild(
          el('a', {'className': 'resultLink', 'href':resultUrl[i], 'target':'_blank'})
            .appendChild(
              el('div', {'className':'container'})
                .appendChild(
                  el('p', {'className':'resultTitle'}).appendChild(document.createTextNode(resultTitle[i])).parentNode 
                ).parentNode
                .appendChild(
                  el('p', {'className':'resultSnippet'}).appendChild(document.createTextNode(resultSnippet[i])).parentNode
                ).parentNode
            ).parentNode
        ).parentNode
  )
  }
}

function el(element, props){
  var el = document.createElement(element);
  
  if(typeof props === 'object'){
    for (var x in props){
      el[x] = props[x];
    }
    
    return el;
  }
  
}

window.onload = function() {
  var apiBase = 'https://en.wikipedia.org/w/api.php?';
  var action = 'action=opensearch';
  var dataType = '&format=json';
  var searchValue = '&search=';
  var returnLimit = '&limit=20';
  var linkType = '&redirects=return';
  var apiFull;
  inputBox = document.getElementsByClassName('searchInput')[0];
  
  resultBox = document.getElementsByClassName('searchResult')[0];
  
  initEvents();

  function initEvents(){
    console.log('events added');
    var randQ = document.getElementsByClassName('fa fa-question-circle')[0];
    
    randQ.addEventListener('click', function(){
          window.open('http://en.wikipedia.org/wiki/Special:Random','_blank')
    })
    
    
    inputBox.addEventListener('focus', function(){
      console.log('input focus');
      this.value = '';
      this.placeholder ='';
    });
    
    inputBox.addEventListener('blur', function(){
      if(this.value == '')
        this.placeholder = 'ask me a question';
    });
    
    inputBox.addEventListener('keypress', function(e){
        if(e.charCode == '13' && inputBox.value != ''){
          clearNodes(resultBox); 
          searchWiki(inputBox.value);
        }
      });
    
    closeBtn = document.getElementsByClassName('fa-times')[0];
    closeBtn.addEventListener('click', function(){
      
      resultBox.className = 'searchResult close';
      resultBox.addEventListener('transitionend', function(){
        resultBox.style.display = 'none';
        resultBox.className = 'searchResult';
      })
      
      resultBox.addEventListener('webkitTransitionEnd', function(){
        resultBox.style.display = 'none';
        resultBox.className = 'searchResult';
      })
      
      clearNodes(resultBox);
    })
  
  }
  
  
  function searchWiki(searchStr){
    apiFull = apiBase + action + dataType + searchValue + searchStr + returnLimit + linkType + '&callback=parseData';
    console.log('searching ' + searchStr);
    
    /*
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
      if(xmlHttp.readystatechange == 4 && xmlHttp.status == 200){
        parseData(xmlHttp.responseText);
      }
    }
    
    xmlHttp.open("GET", apiFull);
    xmlHttp.send(null);*/
    
    injectScript = document.createElement('script');
    injectScript.type = 'text/javascript';
    injectScript.id = 'inScript';
    injectScript.src = apiFull;
    document.head.appendChild(injectScript);
    
      
  }
  
  function clearNodes(thisNode){
    while(thisNode.lastChild.className != 'fa fa-times'){
        console.log('clear ' + thisNode.lastChild)
        thisNode.removeChild(thisNode.lastChild)
    }
  }
  
  
}