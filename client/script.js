(function() {
    

    let replaceIngredients = function(clickHandler) {
        // Create replacement 'Ingredients' element
        let startNode = document.createElement('strong')
        let startText = document.createTextNode('Ingredients: ')
        startNode.appendChild(startText)
    
        // Extract array of ingredient names
        let ingredientsDiv = document.getElementById('ingredients')
        let listString = ingredientsDiv.getAttribute('list')
        let ingredientsList = listString.substring(1, listString.length - 1).split(', ')
        
    
        // Isolate ingredient span element and clear inner elements, add the 'Ingredients: ' bolded element
        let ingredientSpan = ingredientsDiv.getElementsByTagName('span')[0]
        ingredientSpan.innerHTML = ''
        ingredientSpan.appendChild(startNode)
    
        // Append each updated ingredient element to the ingredients list span element
        ingredientsList.forEach((ingredient, i) => {
            let element = document.createElement('span')
            let textNode
            if (i >= ingredientsList.length - 1) {
                textNode = document.createTextNode(ingredient)
            } else {
                textNode = document.createTextNode(ingredient + ', ')
            }
    
            let tooltip = document.createElement('span')
            let tooltipText = document.createTextNode(ingredient)
            tooltip.appendChild(tooltipText)
            tooltip.setAttribute("id", `${ingredient}-tooltip`)
            tooltip.style.visibility = 'hidden'
            tooltip.style.position = `absolute`
            tooltip.style.transform = `translate(-100%, -100%)`
            tooltip.style['z-index'] = 1
    
    
    
            element.appendChild(textNode)
            element.appendChild(tooltip)
            element.setAttribute("id", ingredient)
            element.setAttribute("tooltip", ingredient)
            element.onclick = clickHandler
            ingredientSpan.appendChild(element)
        })
    }
    
    let handleClick = function(event) {
        let text = event.target.id
        let tooltip = document.getElementById(`${text}-tooltip`)
        //let appUrl = 'http://ec2-18-216-185-57.us-east-2.compute.amazonaws.com/getDescription?item=' + text
        let appUrl = 'https://4accd955.ngrok.io/getDescription?item=' + text
        
        fetch(appUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            return res.text()
        }).then((response) => {
            tooltip.innerHTML = response
        }).catch((err) => console.log(err))
    
    
        tooltip.style['background-color'] = '#555'
        tooltip.style.color = '#fff'
        
    
        let visibility = tooltip.style.visibility
        if (visibility === 'hidden') {
            tooltip.style.visibility = 'visible'
        } else {
            tooltip.style.visibility = 'hidden'
        }
    }
    
    
    replaceIngredients(handleClick)
    
    }())