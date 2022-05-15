const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?limit=20`;
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;


const spanError = document.getElementById('error');

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random',data);
  const btnRandoms1= document.getElementById('btnRandom1');
  const btnRandoms2= document.getElementById('btnRandom2');
  const btnRandoms3= document.getElementById('btnRandom3');

  btnRandoms1.onclick = () => saveFavoriteMichi(data[0].id);
  btnRandoms2.onclick = () => saveFavoriteMichi(data[1].id);
  btnRandoms3.onclick = () => saveFavoriteMichi(data[2].id);



  if (res.status != 200){
    spanError.innerHTML = "Error:" + data.message;
  }else{
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    img1.classList.add('show-image');
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  }
}

async function loadRandomFavorites() {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'x-api-key': 'e57e7fe3-f0d4-47cb-b2f6-93e358c7e1fd'
    },
  });
  const data = await res.json();
  console.log('Favorites',data);

  if (res.status != 200){
    spanError.innerHTML = "Error:" + data.message;
  }else {
    const section = document.getElementById('favoritesMichis')
    section.innerHTML = ""
    const h2 = document.createElement('h2');
    const article2 = document.createElement('article');
    article2.classList.add('article-reload');
    section.appendChild(article2);
    article2.appendChild(h2)
    const h2Text = document.createTextNode('Michis Favoritos')
    h2.appendChild(h2Text);
    // section.appendChild(h2);
    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const boxIcon = document.createElement('box-icon');
      const div = document.createElement('div');
      boxIcon.setAttribute('type','solid')
      boxIcon.setAttribute('color','white');
      boxIcon.setAttribute('name','trash-alt');
      img.src = michi.image.url;
      article.appendChild(img);
      article.appendChild(div);
      article.classList.add('article-img')
      div.appendChild(btn);
      btn.appendChild(boxIcon);
      btn.onclick = () => deleteFavoriteMichi(michi.id)
      section.appendChild(article);

      // type='solid' color="white" name='trash-alt'
      // michi.image.url;
    })
  }
}

async function saveFavoriteMichi(id){
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'e57e7fe3-f0d4-47cb-b2f6-93e358c7e1fd'
    },
    body: JSON.stringify({
      image_id: id
    }),
  })
  const data = await res.json();
  if (res.status != 200){
    spanError.innerHTML = "Error:" + data.message;
  }else{
    console.log('Michi guardado en favoritos');
    loadRandomFavorites();
  }

}

async function deleteFavoriteMichi(id){
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'e57e7fe3-f0d4-47cb-b2f6-93e358c7e1fd',
    },
  })
  const data = await res.json();
  if (res.status != 200){
    spanError.innerHTML = "Error:" + data.message;
  }else {
    console.log('Michi Eliminado de favoritos')
    loadRandomFavorites();
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  console.log(formData.get('file'))

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart-form-data',
      'x-api-key': 'e57e7fe3-f0d4-47cb-b2f6-93e358c7e1fd',
    },
    body: formData
  })

  const data = await res.json();
  console.log(data)
  if (res.status != 200){
    spanError.innerHTML = "Error:" + data.message;
  }else {
    console.log('Michi Subido Exitosamente')
    loadRandomFavorites();
  }
}
loadRandomMichis();
loadRandomFavorites();
