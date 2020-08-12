const url = `http://localhost:3000/quotes`

document.addEventListener(`DOMContentLoaded`, e => {
    const quoteList = document.querySelector(`#quote-list`)
    const newQuoteForm = document.querySelector(`#new-quote-form`)
    const renderQuote = (quote) => {
        const quoteCard = document.createElement(`li`)
        const likes = quote.likes ? quote.likes.length : 0
        quoteCard.dataset.id = quote.id
        quoteCard.innerHTML = `
            <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${likes}</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>
        `
        quoteList.append(quoteCard)
    }
    const renderQuotes = () => {
        fetch(url + `?_embed=likes`)
        .then(r => r.json())
        .then(quotesArray => {
            quotesArray.forEach(quote => renderQuote(quote))
        })
    }
    const refresh = () => {
        quoteList.innerHTML = ``
        renderQuotes()
    }

    renderQuotes()

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        if (e.target.matches(`#new-quote-form`)) {
            const quoteObject = {
                quote: newQuoteForm.quote.value,
                author: newQuoteForm.author.value
            }

            fetch(url, {
                method: `POST`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify(quoteObject)
            })
            .then(r => r.json())
            .then(newQuote => renderQuote(newQuote))
        }
    })

    document.addEventListener(`click`, e => {
        if (e.target.matches(`.btn-danger`)) {
            const targetQuote = e.target.closest(`li`)
            const id = targetQuote.dataset.id
            
            fetch(url + `/${id}`, {
                method: `DELETE`
            })
            .then(() => refresh())
        }
        
        if (e.target.matches(`.btn-success`)) {
            const targetQuote = e.target.closest(`li`)
            const id = targetQuote.dataset.id
            const likeSpan = e.target.children[0]
            const likeObject = {quoteId: parseInt(id)}
            
            fetch(`http://localhost:3000/likes`, {
                method: `POST`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify(likeObject)
            })
            .then(r => r.json())
            .then(() => likeSpan.innerText = `${parseInt(likeSpan.innerText) + 1}`)
        }
    })
})