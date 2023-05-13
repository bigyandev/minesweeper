let text = document.querySelector("h1");
let container = document.getElementById("container");
let parent = document.getElementById("parent");
let boxes = document.getElementsByClassName("box");
let Word = "MINESWEEPER"
let wordArray = [...Word];
const colors = ["#e4ba89", "#e4e275", "#c18137", "#20c749", "#64504c"];
let num = 0;
let modelBox = document.getElementById("model")

function separate() {
  text.innerHTML = text.innerText
  .split("")
  .map((let,idx) => `<span class="design">${let}</span>`)
  .join("")
}
separate()
/*function animateText() {
    let spanElement;
    let i = 0;
    let j = 0;
    window.addEventListener("load", ()=> {
          spanElement = document.getElementsByClassName("design");
          spanElement = [...spanElement];
          let run = setInterval(() => {
            
             if(i < spanElement.length) {
                spanElement[i].classList.add("style");
               

             //spanElement[i].classList.add("style");
             
                if(i !== j) {
                    console.log(i,j);
                    spanElement[j].classList.remove("style");
                    spanElement[j].classList.add("return");
                    j++;
                  }
              
            
            
            
             
             
             
             
            
            
             i++;
             
             }
             else {
                clearInterval(run);
             }
          },200)
          
          
    })
    
    }
    
    */

animateText()

function animateText() {
    let spanElements;
    let i = 0;
   
    
    window.addEventListener("load", ()=> {
      spanElements = document.getElementsByClassName("design");
      spanElements = [...spanElements];
      if(i <= spanElements.length) {
       run = setInterval(() => {
        
          if(i !== 0) { // remove style class from previous element
            spanElements[i-1].classList.remove("style");
            spanElements[i-1].classList.add("return");
            
          }
          
          spanElements[i].classList.add("style");
          
          i++; // increment i at the beginning of the interval
         if(i == spanElements.length) {
            clearInterval(run);
         }
      }, 100)
      
    } 
   
    
    })
    setTimeout(() => {
        
        text.classList.add("remove");
        document.body.style.backgroundColor = "black";
        parent.style.display = "block";
        
      },3000)
  }
  
  animateText()
  

  // create box 
  function createBox() {
    for(let i = 0; i <= 498; i++) {
       let boxes = document.createElement("div");
       boxes.classList.add("box");
       boxes.setAttribute("id", i);
       boxes.addEventListener("mouseover", () => setColor(boxes));
       boxes.addEventListener("mouseout", () =>  removeColor(boxes));
       boxes.addEventListener("click", function() {
        //safeBox(boxes);
        checkBomb(boxes);
        //checkLetter(boxes);
       })
       //boxes.addEventListener("click", () => safeBox(boxes));
       container.appendChild(boxes);

     }
  }

  
  createBox()
  function setColor(boxes) {
    
    const color = getColor();
    if(boxes.style.backgroundColor !== "white") {
    boxes.style.backgroundColor = color;
    boxes.style.transitionDuration = '';
    }
        
    
     
  }
  function removeColor(boxes) {

    if (!boxes.classList.contains('clicked')) {
      boxes.style.backgroundColor = "#1d1d1d";
    }
  }
   
  function getColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  window.addEventListener("load", ()=> {
    console.log([...container.children])
  })
  
  //add bomb 
  function bombAdd() {
    let sqr;
    document.addEventListener("click", () => {
       sqr = [...container.children]
    })
    for(let i = 0; i <= 40; i++) {
      let num = Math.floor((Math.random() * 500));
      let selectedBox = document.getElementById(`${num}`);
      console.log(selectedBox)
      let image = document.createElement("img");
      image.setAttribute("src", "bomb.png");
      image.setAttribute("height", "20");
      image.setAttribute("width", "20");
      selectedBox.appendChild(image);
    }
  }
  bombAdd();
 /* function safeBox(elem) {
    
    if(!elem.hasChildNodes()) {
        let randomNumber = Math.floor(Math.random() * 5);
        if(randomNumber == 0) {
          randomNumber++;
        }
        let idNum = elem.getAttribute("id");
        for(let i = 0; i<randomNumber; i++) {
          
          
          if(idNum > 400) {
            idNum--;
          }
          else {
            idNum++;
          }
          let select = document.getElementById(`${idNum}`);
          console.log(select);
          
        }



        
    }
  
  }
  */

  //safeBox();
  // check bomb 
  function checkBomb(elem) {
  
   
    if(elem.hasChildNodes()) {
      
        
          let image = (elem.firstChild.tagName);
          if(image === "IMG") {
          console.log(image);
           [...container.children].forEach((child) => {
            if(child.hasChildNodes()) {
          child.firstChild.style.backgroundColor = '#FF726F';
          child.firstChild.style.display = 'block';
          child.firstChild.style.border = `3px solid red`;
          child.firstChild.boxSizing = "border-box";
          
            }
           })
           modelFailure();
           } else if(image === "H4") {
            num += 1;
            console.log(num);
            
            if(num >= wordArray.length) {
              console.log("win");
              modelSuccess();
            }
               elem.firstChild.style.display = "block";
               elem.style.border = '3px solid green';
               elem.style.boxSizing = "border-box"
               //elem.firstChild.style.color = 'white';
           }
           
      
    
      
        
        
      
      
    } else {
      
      //elem.style.backgroundColor = "white";
      elem.style.transition = "none";
      elem.removeEventListener('mouseover', setColor);
      elem.removeEventListener('mouseout', removeColor);
      elem.removeEventListener('click', checkBomb);
      elem.style.border = "3px solid white";
      elem.style.boxSizing = "border-box";
      let randomNumber = Math.floor(Math.random() * 5);
        if(randomNumber == 0) {
          randomNumber++;
        }
        let idNum = elem.getAttribute("id");
        
        for(let i = 0; i<randomNumber; i++) {
          
          
          if(idNum > 400) {
            idNum--;
          }
          else {
            idNum++;
          }
          //myArray.push(idNum);
        
          let select = document.getElementById(`${idNum}`);
          if(select.hasChildNodes()) {
            let tag = select.firstChild.tagName;
            if(tag == "H4") {
              console.log(select.firstChild);
              select.firstChild.style.display = 'block';
              select.firstChild.style.transition = "3s ease";
              num += 1;
              console.log(num);
              if(num >= wordArray.length) {
                modelSuccess();
              }
              //let cstyle = getComputedStyle(select.firstChild)
              //console.log(cstyle);

              //select.forstChild.style.border = "3px solid green";
              //myArray.push(idNum + 1);
              //let asortedArray = new Set(myArray);
              //console.log(asortedArray);
            }
            else {
              select.removeChild(select.firstChild);
            }
          }
          
          
            if(elem.classList.contains("active")) return;
              select.style.border = `3px solid ${getColor()}`;
              select.style.boxSizing = "border-box";
              select.style.transition = '';
              select.classList.add("active");
              console.log(select);
            
          
          
          

          
        }

    }
    
  }
  function randomWord() {
    
    
    for(let i = 0; i < wordArray.length; i++) {
      let num = Math.floor((Math.random() * 500));
      let selectedBox = document.getElementById(`${num}`);
      console.log(selectedBox);
      if(selectedBox.hasChildNodes()) {
        i -= 1;
      }
      else {
      let h4 = document.createElement("h4");
      let letter = document.createTextNode(wordArray[i]);
      h4.appendChild(letter);
      selectedBox.appendChild(h4);
      console.log(selectedBox);
      }
    }
  }
  
  
  randomWord();


 
  
function modelSuccess() {
  model.style.transform = `translateY(0px)`;
  model.style.transition = `2s ease`;
  model.style.backgroundColor = "#009B77";
  let heading = document.createElement("H2");
  let text = document.createTextNode("WINNER");
  heading.appendChild(text);
  model.appendChild(heading);
  

}
function modelFailure() {
  model.style.transform = `translateY(0px)`;
  model.style.transition = `2s ease`;
  model.style.backgroundColor = "#DD4124";
  let heading = document.createElement("H2");
  let text = document.createTextNode("BOMBASTIC");
  heading.appendChild(text);
  model.appendChild(heading);
  heading.previousElementSibling.innerHTML = "TRY AGAIN";
  console.log(model.children);
  if([...model.children].length >= 3) {
    model.removeChild(model.lastChild);
  }

}
function restart() {
  model.style.transform = "translateY(-600px)";
  [...container.children].forEach((child) => {
    child.style.borderColor = "transparent";
    if(child.hasChildNodes()) {
      child.removeChild(child.firstChild);
    //child.firstChild.style.display = 'none';
  }
});
  bombAdd();
  randomWord();

}
