const quotesUrl = "http://localhost:3000/quotes/"
const likesUrl = "http://localhost:3000/likes/"

document.addEventListener("DOMContentLoaded", e => {

    const pullData = () => {
        fetch(quotesUrl)
            .then(res => res.json())
            .then(quotes => quotes.forEach(quote => renderQuote(quote)))
    }

    const renderQuote = (quote) => {
        const quoteUL = document.getElementById("quote-list")
        const quoteLi = document.createElement("li")
        quoteLi.classList.add("quote-card")
        quoteLi.dataset.id = quote.id

        quoteLi.innerHTML = `
            <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer"> - ${quote.author}"</footer><br />
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>
            <br />
            <br />
        `
        quoteUL.append(quoteLi)
    }

    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            createQuote()
        })
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches("button.btn-danger")){
                const button = e.target
                deleteQuote(button)
            }

        })
    }

    const createQuote = () => {
        const newQuoteForm = document.getElementById("new-quote-form")
        const newQuoteQuote = newQuoteForm.quote.value
        const newQuoteAuthor = newQuoteForm.author.value
        const newQuote = {
            quote: newQuoteQuote,
            author: newQuoteAuthor
        }
        const packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newQuote)
        }
        fetch(quotesUrl, packet)
            .then(res => res.json())
            .then(renderQuote(newQuote))

    }

    const deleteQuote = (button) => {
        const quoteId = button.parentElement.parentElement.dataset.id

        const packet = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        }

        fetch(quotesUrl + quoteId, packet)
            .then(pullData)
        const quoteUL = document.getElementById("quote-list")
        while(quoteUL.firstChild){
            quoteUL.removeChild(quoteUL.lastChild)
        }
    }


    pullData()
    submitHandler()
    clickHandler()

})