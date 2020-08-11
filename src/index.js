document.addEventListener("DOMContentLoaded", function() {

    const form = document.querySelector('form')
    const div = form.parentNode 
    //#1
    function getData() {
        fetch("http://localhost:3000/quotes?_embed=likes")
        .then(response => response.json())
        .then(quotes => {
            quotes.forEach(quote => {
                // const quoteLi = document.createElement('li')
                // quoteLi.innerHTML =`
                //     <blockquote class="blockquote">
                //         <p class="mb-0">${quote.quote}</p>
                //         <footer class="blockquote-footer">${quote.author}</footer>
                //         <br>
                //         <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
                //         <button class='btn-danger'>Delete</button>
                //     </blockquote>
                // `
                // quoteLi.className = 'quote-card'
                // div.append(quoteLi)
                renderData(quote)
            })
        })
    }

    //#2
    function renderData(quote) {
        const quoteLi = document.createElement('li')
                quoteLi.innerHTML =`
                    <blockquote class="blockquote">
                        <p class="mb-0">${quote.quote}</p>
                        <footer class="blockquote-footer">${quote.author}</footer>
                        <br>
                        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
                        <button class='btn-danger'>Delete</button>
                    </blockquote>
                `
                quoteLi.className = 'quote-card'
                quoteLi.id = quote.id
                div.append(quoteLi)
    }

    //#3
    function createQuote() {
        document.addEventListener('submit', e => {
            const form = document.querySelector("form")
            const newQuote = form.children[0].children[1].value 
            const newAuthor = form.children[1].children[1].value
            e.preventDefault()
            
            const obj = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    quote: newQuote,
                    author: newAuthor        
                })
            }

            fetch("http://localhost:3000/quotes", obj)
            .then(response => response.json())
            .then(newData => {
                const quoteLi = document.createElement('li')
                quoteLi.innerHTML =`
                    <blockquote class="blockquote">
                        <p class="mb-0">${newData.quote}</p>
                        <footer class="blockquote-footer">${newData.author}</footer>
                        <br>
                        <button class='btn-success'>Likes: <span>${0}</span></button>
                        <button class='btn-danger'>Delete</button>
                    </blockquote>
                `
                quoteLi.className = 'quote-card'
                div.append(quoteLi)
            })
        })
    }

    //#4
    function clickHadler() {
        document.addEventListener('click', e => {
            if (e.target.className === 'btn-danger') {
                obj = {
                    method: "DELETE"
                }
                fetch(`http://localhost:3000/quotes/${e.target.parentNode.parentNode.id}`, obj)
                e.target.parentNode.parentNode.remove()
            }
        })
    }


    document.addEventListener('click', e => {
        if (e.target.className === "btn-success"){
            const obj = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    quoteId: parseInt(e.target.parentNode.parentNode.id)

                })
            }
            fetch(`http://localhost:3000/likes`, obj)
            .then(response => response.json)
            e.target.children[0].innerText = parseInt(e.target.children[0].innerText)+1
        }
        
    })
   


    





    getData()
    createQuote()
    clickHadler()
})