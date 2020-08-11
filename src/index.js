document.addEventListener("DOMContentLoaded", () => {
    //global variables
    const QUOTES = "http://localhost:3000/quotes"
    const LIKES = "http://localhost:3000/likes"
    const quoteList = document.getElementById("quote-list")
    const form = document.getElementById("new-quote-form")
    let allQuotes = []
    let allLikes = []

    //fetchQuotes
    const fetchQuotes = async () => {
        const res = await fetch(QUOTES)
        const data = await res.json()
        data.forEach(obj => {
            allQuotes.push(obj)
            renderQuote(obj)})
    }

    //fetchLikes
    const fetchLikes = async () => {
        const res = await fetch(LIKES)
        const data = await res.json()
        data.forEach(obj => allLikes.push(obj))
    }

    //newQuotes
    const newQuotes = async (obj) => {
        settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }
        const res = await fetch(QUOTES, settings)
    }

    //updateLikes
    const updateLikes = async (obj) => {
        const date = new Date();
        const createdAt = Math.floor(date.getTime()/1000)
        settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "quoteId": obj,
                "createdAt": createdAt
            })
        }
        const res = await fetch(LIKES, settings) 
    }

    //deleteQuote
    const deleteQuote = async (id) => {
        settings = {
            method: 'DELETE'
        }
        const res = await fetch(`${QUOTES}/${id}`, settings)
    }


    //renderQuote
    const renderQuote = (obj) => {
        const li = document.createElement('li')
        li.class = "quote-card"
        li.dataset.quoteId = obj.id
        const likes = allLikes.filter(each => each.quoteId == obj.id)
        let likeDisplay = !likes ? 'undefined' : likes.length
        li.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${obj.quote}</p>
        <footer class="blockquote-footer">${obj.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${likeDisplay}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
        `
        quoteList.append(li)
    }

    const formHandler = () => {
        form.addEventListener("submit", e =>{
            e.preventDefault()
            const newQuoteVal = document.getElementById("new-quote").value
            const newAuthorVal = document.getElementById("author").value
            const newObj =   
            {   
                "quote": newQuoteVal,
                "author": newAuthorVal,
                "likes": []
            }
            newQuotes(newObj)
            e.target.reset()
        })

    }


    const clickHandler = () => {
        quoteList.addEventListener("click", e => {
            const currId = e.target.parentElement.parentElement.dataset.quoteId
            if(e.target.matches(".btn-success")){
                updateLikes(parseInt(currId))
            }
            if(e.target.matches(".btn-danger")){
                deleteQuote(currId)
            }
        })
    }

    fetchLikes()
    fetchQuotes()
    formHandler()
    clickHandler()
})