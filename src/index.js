const QUOTE_URL = "http://localhost:3000/quotes?_embed=likes"
const QUOTE_URL_NOLIKES = "http://localhost:3000/quotes/"


document.addEventListener("DOMContentLoaded", function(){

    const getQuotes=()=>{
        fetch(QUOTE_URL)
            .then(resp => resp.json())
            .then(quotes =>{
                renderQuotes(quotes)
            })
    }

    const renderQuotes= quotes =>{
        const quoteDiv = document.getElementById("quote-list")
              quoteDiv.innerHTML = ''  
        for (const quote of quotes) {
            renderQuote(quote, quoteDiv)
        }
  
    }

    const renderQuote=(quote, quoteDiv)=>{
        const quoteLi = document.createElement("li");
              quoteLi.classList = 'quote-card'  

        quoteLi.innerHTML= `
                    <blockquote class="blockquote" data-quote-id="${quote.id}">
                    <p class="mb-0">${quote.quote}</p>
                    <footer class="blockquote-footer">${quote.author}</footer>
                    <br>
                    <button class='btn-success'>Likes:  <span>${quote.likes.length}</span></button>
                    <button class='btn-secondary'>Edit</button>
                    <button class='btn-danger'>Delete</button>
                    </blockquote>
        `

        quoteDiv.appendChild(quoteLi)
    }

    likeHandler = () => {
        const likeBtn = document.getElementsByClassName("btn-success")
        document.addEventListener("click", e => {
            if (e.target.classList.value === "btn-success"){
                console.log("yay")
            } else if (e.target.className === "btn-secondary") {
                const quoteId = e.target.parentNode.dataset.quoteId
                let quote = e.target.parentNode.querySelector('p').textContent,
                    author = e.target.parentNode.querySelector('footer').textContent;

                let formQuote = document.querySelector("#new-quote"),
                    formAuthor = document.querySelector("#author")

                    formQuote.value = quote
                    formAuthor.value = author

                    const options = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            author: author,
                            quote: quote
                        })
                    }
                    fetch(QUOTE_URL_NOLIKES + quoteId, options)
                        .then(console.log)
                
            }
        })
    }

    submitHandler=()=>{
        document.addEventListener("submit", e => {
            let quote = e.target.quote.value,
                author = e.target.author.value

            if (e.target.id === "new-quote-form") {
                
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        author: author,
                        quote: quote

                    })


                }
                fetch(QUOTE_URL, options)
                .then(response =>{
                    form.reset()
                    getQuotes()
                })
            } 


        })
    }

    deleteHandler = () => {
        document.addEventListener("click", e =>{
            if (e.target.innerText === "Delete") {
                console.log("yay")
                const quoteId = e.target.parentNode.dataset.quoteId

                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // body: JSON.stringify(jsObject)
                }
                fetch(QUOTE_URL_NOLIKES + quoteId, options)
                    .then(getQuotes)
              
                    
            }
        })
    }

    // editHandler = () => {
    //     document.addEventListener('click', e => {
    //         if (e.target.className === "btn-secondary") {
    //             const editForm  = document.getElementById('edit-quote-form')
    //                   editForm.style.display = 'block'  

    //             const quoteId = e.target.parentNode.dataset.quoteId


    
    //                 console.log()
    //             const options = {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     author: author,
    //                     quote: quote,
    //                     likes: []
    //                 })
    //             }
    //             fetch(QUOTE_URL_NOLIKES + quoteId, options)
    //             .then(console.log)
    //         }
    //     })
    // }



    getQuotes()
    likeHandler()
    submitHandler()
    deleteHandler()
    // editHandler()
})