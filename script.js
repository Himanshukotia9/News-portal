fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F')
.then(response => {
    if(!response.ok){
        throw new Error('Network is not responding');
    }
    return response.json();
})
.then(data => {
    const newList = document.getElementById('news-list');
    data.items.forEach(item => {
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        const a = document.createElement('a');
        const p = document.createElement('p');
        const p2 = document.createElement('p');
        h2.textContent = item.title;
        a.href = item.link;
        a.textContent = 'Read More';
        p.textContent = item.author;
        p2.textContent = item.pubDate;
        li.appendChild(h2);
        li.appendChild(document.createTextNode(item.description));
        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(p2);
        newList.appendChild(li);
    });
});