// MODEL
const model = {
    currentCat: null,
    cats: [
        {
            name: "Kittie",
            likes: 0,
            imgSrc: "img/cat1.jpg"
        },
        {
            name: "Darwin",
            likes: 0,
            imgSrc: "img/cat2.jpg"
        },
        {
            name: "Perry",
            likes: 0,
            imgSrc: "img/cat3.jpg"
        },
        {
            name: "Gumball",
            likes: 0,
            imgSrc: "img/cat4.jpg"
        }
    ]
};

// CONTROLLER
const controller = {
    init: function(){
        model.currentCat = model.cats[Math.floor(Math.random() * model.cats.length)];
        this.admin = false;

        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function(){
        return model.currentCat;
    },

    setCurrentCat: function(cat){
        model.currentCat = cat;
    },

    getCats: function(){
        return model.cats
    },

    likeCat: function(){
        model.currentCat.likes++;
        catView.render();
    },

    setAdmin: function(){
        this.admin = !this.admin;

        adminView.render();
    },

    updateCat: function(name, imgSrc, likes){
        model.currentCat.name = name;
        model.currentCat.imgSrc = imgSrc;
        model.currentCat.likes = likes;

        catView.render();
        catListView.render();
    }
};

// CAT VIEW
const catView = {
    init: function(){
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImgElem = document.getElementById('cat-img');
        this.catLikesElem = document.getElementById('cat-count');

        this.catImgElem.addEventListener('click', function(){
            controller.likeCat();
        });

        this.render();
    },

    render: function(){
        const currentCat = model.currentCat;

        this.catNameElem.textContent = currentCat.name;
        if (currentCat.likes){
            this.catLikesElem.textContent = "You liked " + currentCat.likes + " times and counting...";
            this.catLikesElem.style.color = "green";
        } else {
            this.catLikesElem.textContent = "Just click the cat, I will count how much you like the cat :)";
        }

        this.catImgElem.src = currentCat.imgSrc;
    }
};

// CAT LIST VIEW
const catListView = {
    init: function(){
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render: function(){
        let elem, cat, i;
        catList = model.cats;

        this.catListElem.innerHTML = '';

        for(i=0; i < catList.length; i++){
            cat = catList[i];

            elem = document.createElement('a');
            elem.className = "dropdown-item";
            elem.textContent = cat.name;

            elem.addEventListener('click', (function(catObj){
                return function(){
                    controller.setCurrentCat(catObj);
                    catView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);
        }
    }
};


// ADMIN AREA VIEW
const adminView = {
    init: function(){
        this.adminArea = document.getElementById('admin-area');
        this.adminButton = document.getElementById('admin-btn');
        this.inputCatNameElem = document.getElementById('input-name');
        this.inputImgSrcElem = document.getElementById('input-imgsrc');
        this.inputInputClick = document.getElementById('input-click');
        this.inputSave = document.getElementById('save-admin');

        this.adminArea.style.visibility = 'hidden';

        this.adminButton.addEventListener('click', function(){
            controller.setAdmin();
            adminArea = document.getElementById('admin-area');
            if (controller.admin) {
                adminArea.style.visibility = 'visible';
            } else {
                adminArea.style.visibility = 'hidden';
            }
        });

        this.inputSave.addEventListener('click', () => {
            controller.updateCat(this.inputCatNameElem.value, this.inputImgSrcElem.value, this.inputInputClick.value);
        });

        this.render();
    },

    render: function(){
        this.inputCatNameElem.value = model.currentCat.name;
        this.inputImgSrcElem.value = model.currentCat.imgSrc;
        this.inputInputClick.value = model.currentCat.likes;
    }
};

controller.init();
