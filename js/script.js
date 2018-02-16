// Wait for document to be ready 
var operators = [];
var numbers = ["0","1","2","3","4","5","6","7","8","9"];
var operand_set_1 = ["/", "*", "+"];
var operand_set_2 = ["/","*","+","-"]; 
console.log(operand_set_2); 
var addDecimal = true; 
function result(param){
  if(param == "="){    
     // empty array 
     var result_str = eval(operators.join('')).toString(); 
     if(result_str.length >= 12){
      result_str = result_str.substring(0, 11) + "...";  
     }
    $("#screen_calc").html(result_str);  // update the screen 
  }
  else if(operators.length < 12){
    
    // when array size is zero 
    // can only push a number or - or . operator at beginning 
    if(operators.length == 0){
      if(numbers.indexOf(param) != -1 || param == "-" || param == "."){
        operators.push(param); 
      }
    }

    // operators array is not empty 
    else if(operators.length > 0){
      var last_elem = operators[operators.length - 1];
      console.log("l " + last_elem + " f " + param); 
      // new element is just a number 
      if(numbers.indexOf(param) != -1 || param == '.'){
        if(param == '.'){
          if(addDecimal){
            operators.push(param); 
            addDecimal = false; 
          }
        }else{
          operators.push(param); 
        }
      }
      // new element is an operator and last is a number
      else if(operand_set_2.indexOf(param) != -1 && numbers.indexOf(last_elem) != -1 && operators.length < 11){
        addDecimal = true; 
        operators.push(param); 
      }
      // if new element is operator and last element is operator 
      else if(operand_set_2.indexOf(last_elem) != -1 && operand_set_2.indexOf(param) != -1 && operators.length < 11){ 
        addDecimal = true; 

        if(last_elem != "-" && param == "-"){
          operators.push(param); 
        }
        else if(last_elem == "-"){
          // first element is - 
          if(operators.length == 1){
            operators[operators.length - 1] = param;
          }
          // second last element is some operator 
          else if(operand_set_2.indexOf(operators[operators.length - 2]) != -1){

            operators.pop();
            operators.pop(); 
            operators.push(param);  
          }
          // second last element is number 
          else if (numbers.indexOf(operators[operators.length - 2]) != -1){
            operators[operators.length - 1] = param; 
          }
        }
        // replace operators not following above conditions
        else if(last_elem != "-"){
          operators[operators.length - 1] = param; 
        }

        
        // update the screen value
        $("#screen_calc").html(operators.join("")); 
      }
      

    }
    $("#screen_calc").html(operators.join("")); // update the screen value 

  }else{
    alert("Calculator Input Character Size Limit Reached"); 
    operators = []; 
      $("#screen_calc").html(operators.join("")); // update the screen value 


  }
}



$(document).on("click", "#del", function() {
    operators = [];  // empty the array 
    $("#screen_calc").html(operators.join(""));   // update the screen 

});
