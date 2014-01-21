var showit = document.getElementById('showit');
var or = document.getElementById('or');
var qu = document.getElementById('qu');
var co = document.getElementById('co');   		
var sp = document.getElementById('sp');
var bo = document.getElementById('bo');
var btn = document.getElementById('createString');
var inputs = { 'or' : or, 'qu' : qu, 'co' : co, 'sp' : sp, 'bo' : bo };

showit.style.display = 'none';
or.addEventListener('click', function(){ this.select(); });
qu.addEventListener('click', function(){ this.select(); });
co.addEventListener('click', function(){ this.select(); });
sp.addEventListener('click', function(){ this.select(); });
bo.addEventListener('click', function(){ this.select(); });

btn.addEventListener('click', function(){ 
    change();
});

/**
 *  
 */
 function change()
{
    var item = document.getElementById('item').value;
     
    if(item != '')
    {
    	var pattern = /,/g;
    	var patt = '';
    	var w = item.replace(pattern, '');

    	document.getElementById('item').value = w;
    	
    	var splits = w.split(patt);

    	if(splits.length != 7) //throw an error
    	{
    		document.getElementById('error').innerHTML = 'There was an error in the input. Please try again.';
    		inputs.or.value = '';
    		inputs.qu.value = '';
    		inputs.co.value = '';
    		inputs.sp.value = '';
    		inputs.bo.value = '';
    		document.getElementById('all').innerHTML = '';
    		showit.style.display = 'none';
    	}
    	else
    	{
    		
    		document.getElementById('error').innerHTML = '';
    		document.getElementById('showit').style.display = 'inline';
    							
    		var qu = '"'+w+'"';
    		var co = '"'+splits[0]+','+splits[1]+splits[2]+splits[3]+','+splits[4]+splits[5]+splits[6]+'"';
    		var sp = '"'+splits[0]+' '+splits[1]+splits[2]+splits[3]+' '+splits[4]+splits[5]+splits[6]+'"';
    		var bo = '*'+splits[1]+splits[2]+splits[3]+'*'+splits[4]+splits[5]+splits[6]+'*';
    	
    		var at = document.createAttribute('style');
    		at.nodeValue = 'cursor: pointer; padding: 5px;';
    		
    		var part = document.createElement('li');
    		
    		//part.setAttributeNode(at);
    		part.innerHTML = w;
    		if (part.addEventListener)
    		{
    			part.addEventListener('click', function(){
    				document.getElementById('item').value = part.innerHTML;
    				change(this.innerHTML);
    			});
    		}
    		else if (part.attachEvent)
    		{
    			part.attachEvent('onclick', function(){
    				document.getElementById('item').value = part.innerHTML;
    				change(this.innerHTML);
    			});

    		}
    		
    		document.getElementById('recents').insertBefore(part, document.getElementById('recents').firstChild);
    		inputs.or.value = w;
    		inputs.qu.value = qu;
    		inputs.co.value = co;
    		inputs.sp.value = sp;
    		inputs.bo.value = bo;
    		document.getElementById('all').innerHTML = w+', '+qu+', '+co+', '+sp+', '+bo;
    		document.getElementById('ss').innerHTML = 'Search String';
    		
    		codeSelect(all);
    	}
    }
    
}


/**
 *  
 */
function codeSelect(all)
{
    var myDiv = document.getElementById('all');
    if (window.getSelection) 
    {
    	var selection = window.getSelection();
    	if (selection.setBaseAndExtent) 
    	{ /* for Safari */
    		selection.setBaseAndExtent(myDiv, 0, myDiv, 1);
    	} 
    	else 
    	{ /* for FF, Opera */
    		var range = document.createRange();
    		range.selectNodeContents(myDiv);
    		selection.removeAllRanges();
    		selection.addRange(range);
    	}
    }
    else
    { /* for IE */
    	var range = document.body.createTextRange();
    	range.moveToElementText(myDiv);
    	
    	if (range.select) {
    		if (range.boundingWidth > 0) {
				range.select();
    		}
    		} else {
    			selection.removeAllRanges();
    			selection.addRange(range);
    			doc.body.focus();
    		}
    	
    	//range.select();
    }
}



