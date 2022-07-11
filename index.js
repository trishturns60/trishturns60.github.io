var currLoc = 'home';
var filping = false;
 HideContent = (Id) => {

    // var page = ['home', 'about', 'projects', 'contact'];
    var page = ['home', 'about', 'contact'];
    if (page.length > 0) {
        var i;
        for (i = 0; i < page.length; i++) {
            if (page[i] !== Id) {
                // document.getElementById(page[i]).style.visibility = "hidden";
                // document.getElementById(page[i]).style.display = "none";
            }
        }
    }
}
 openPage = (pageName) => {
    if(pageName === ""){
        
    }
    if(pageName === ""){

    }
    if(pageName === ""){

    }
 }
 flip = (Id, back = true) => {
    console.log('currLoc',currLoc);
    if(filping) return;
    if(Id === currLoc) return;
    filping = true;
    var $oldBox = $("#" + currLoc);
    var $newBox = $("#" + Id);
    var $oldButton = $("#" + currLoc + "But");
    var $newButton = $("#" + Id + "But");
    var outerWidth = $oldBox.outerWidth(true);

    $newButton.css({
        // "background": "rgb(94, 164, 255,0.4)",
        // "border-radius": "50%",
        // "box-shadow": "0 0 60px 1px rgb(94, 164, 255, 0.6)"
        "border-bottom":"2px solid #b11226",
    });
    $oldButton.css({
        "border-bottom": "unset",
        // "background": "",
        // "border-radius": "",
        // "box-shadow": "",
        // "padding": ""
    });

    var posSlideOut = (back ? -outerWidth : outerWidth);
    var posSlideIn = (back ? -outerWidth : outerWidth);

    document.getElementById(Id).classList.remove('hidden-page');
    document.getElementById(Id).classList.add('not-hidden-page');
    $newBox.css({ "margin-right": (-posSlideIn) + "px", "margin-left": posSlideIn + "px", "visibility": "unset", "display": "flex", "align-items": "center", "flex-direction": "column" });
    
    $oldBox.animate({ "margin-left": -posSlideOut + "px", "margin-right": posSlideIn + "px" }, 600);
    $newBox.animate({ "margin-left": "", "margin-right": "" },650 , () =>  {
        document.getElementById(currLoc).classList.remove('not-hidden-page');
        document.getElementById(currLoc).classList.add('hidden-page');
        currLoc = Id;
        filping = false;
    });
    // $newBox.css({
    //     "height": "100% !important",
    //     "overflow-y": "scroll !important",
    // });
    // $oldBox.css({
    //     "height": "unset",
    //     "overflow-y": "unset",
    // });
    
    
}

$(() => {
    // $('.icon').hover(
    //     () => {
    //         $(this).find('img').css("display", "none");
    //         $(this).find('p').css({ "display": "block", "position": "fixed" });
    //     }, () => {
    //         $(this).find('img').css({ "display": "block" });
    //         $(this).find('p').css("display", "none");
    //     }
    // );
});

 forward = () => {
    var next = 'about';
    if (currLoc.indexOf('about') == 0) {
        next = 'contact';
    }
    if (currLoc.indexOf('projects') == 0) {
        next = 'contact';
    }
    if (currLoc.indexOf('contact') == 0) {
        next = 'home';
    }
    flip(next, false);
}

 backward = () => {
    console.log('backward');
    var next = 'contact';
    if (currLoc.indexOf('about') == 0) {
        next = 'home';
    }
    if (currLoc.indexOf('projects') == 0) {
        next = 'about';
    }
    if (currLoc.indexOf('contact') == 0) {
        next = 'about';
    }
    flip(next);
}
document.onkeydown =  (event) => {
    switch (event.keyCode) {
        case 37:
            backward();
            break;
        case 39:
            forward();
            break;
    }
};


$(() => {
    // $('.pageCont').on('swipeleft', (e) => {
    //     forward();
    // });
    // let mapOptions = {
    //     center:[51.958, 9.141],
    //     zoom:10
    // }
    
    
    // let map = new L.map('map' , mapOptions);
    
    // let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // map.addLayer(layer);
    
    // let marker = new L.Marker([51.958, 9.141]);
    // marker.addTo(map);
    
});
$(() => {
    // $('.pageCont').on('swiperight', (e) => {
    //     backward();
    // });
});

loaderToggle =(val) => { 
 $("#loader").toggleClass('loader');
}

 submit = () => {
    var name = $('#inputName').val();
    var email = $('#inputEmail').val();
    var msg = $('#inputMsg').val();

    var block = false;

    if (name.length == 0) {
        block = true;
        $('#inputName').css("border-bottom", "red 1px solid");
        $('#inputName').attr("placeholder", "Name Required");
    } else {
        $('#inputName').css("border-bottom", "white 1px solid");
    }

    if (email.length == 0) {
        block = true;
        $('#inputEmail').css("border-bottom", "red 1px solid");
        $('#inputEmail').attr("placeholder", "Email Required");
    } else {
        $('#inputEmail').css("border-bottom", "white 1px solid");
    }

    if (email.indexOf('@') < 0) {
        block = true;
        $('#inputEmail').css("border-bottom", "red 1px solid");
        $('#inputEmail').attr("placeholder", "Valid Email Required");
        $('#inputEmail').val("");
    } else {
        $('#inputEmail').css("border-bottom", "white 1px solid");
    }

    if (msg.length == 0) {
        block = true;
        $('#inputMsg').css("border-bottom", "red 1px solid");
        $('#inputMsg').attr("placeholder", "Message Required");
    } else {
        $('#inputMsg').css("border-bottom", "white 1px solid");
    }
    if (!block) {
        loaderToggle('show');
        const domainUrl = 'https://henryk91-note.herokuapp.com/api/email';
        const message = name + '\n' + email + '\n' + msg
        const obj = { board: 't4', email, text: message, delete_password: '1234' };
        $(() => {
            $.post(domainUrl,
            obj,
            () => {
                loaderToggle('hide');
                alert("Message Sent. I will be in touch asap.");
                $('#inputName').val("");
                $('#inputEmail').val("");
                $('#inputMsg').val("");
                flip("home");
            });
        });
    }
}

logUse = () => {
    const domainUrl = 'https://henryk91-note.herokuapp.com/api/log';
    $(() => {
        $.get(domainUrl,
        () => {console.log('Welcome to my site.')});
    });
}
logUse();