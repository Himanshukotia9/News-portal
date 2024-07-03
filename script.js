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
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const btn = document.createElement('button');
        const h2 = document.createElement('h2');
        const a = document.createElement('a');
        const p = document.createElement('p');
        const p2 = document.createElement('p');
        div2.id = 'news-footer'
        h2.textContent = item.title;
        a.href = item.link;
        a.textContent = 'Read More';
        p.textContent = item.author;
        p2.textContent = item.pubDate;
        btn.textContent = 'Delete';

        const cleanedDescription = cleanText(item.description);

        li.appendChild(h2);
        li.appendChild(document.createTextNode(cleanedDescription));
        li.appendChild(a);

        div1.appendChild(p);
        div1.appendChild(p2);
        div2.appendChild(div1);
        div2.appendChild(btn);

        li.appendChild(div2);
        newList.appendChild(li);


        btn.addEventListener('click', function(){
            li.remove();
        })
    });
})
.catch(error => console.log(error));

function cleanText(description) {
    // Remove HTML tags using a regular expression
    let text = description.replace(/<\/?[^>]+(>|$)/g, "");

    // Replace multiple spaces with a single space
    text = text.replace(/\s\s+/g, ' ');

    text = text.replace('© 2024 TechCrunch. All rights reserved. For personal use only.', ' ');

    // Trim leading and trailing whitespace
    text = text.trim();

    return text;
}