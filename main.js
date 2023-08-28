const addInfo = document.querySelector('.add-info');
const addGroup = document.querySelector('.add-group');
const mainContent = document.querySelector('.main-content');
var title = document.querySelector('.title');
const mainContainer = document.querySelector('.main-container');
var cntGroup = 0;
var cntItem = 0;
const inputIcon = document.querySelector('.input-icon');
function createGroup() {
    mainContainer.innerHTML = mainContainer.innerHTML + `
    <div id=${cntGroup} className=${cntGroup} class="init-group">
        <div class="main-title">
            <h3 class="title">Group Item_20204804</h3>
            <div class="deleteIcon"><i className=${cntGroup} class="fa-solid fa-trash-can"></i></div>
            <div class="button">
                <h4 className=${cntGroup} class="add-info"> &lt; Add Info Item &gt;</h4>
                &emsp;&emsp;&emsp;&emsp;
                <h4 class="add-group"> &lt; Add Group Item &gt;</h4>
            </div>
        </div>
    </div>
    `;
}

function createItem(id) {
    const element = document.getElementById(id);
    element.innerHTML = element.innerHTML + `
    <div cntItem=${cntItem} class="main-content">
        <p class="info-item">Item Info Name</p>
        <div class="input-icon">
            <input class="input-item" type="text">
            <div class="icon"><i cntItem=${cntItem} class="fa-solid fa-trash-can delete-info"></i></div>
        </div>
    </div>
    `;
}

mainContainer.onclick = function (e) {
    var targeted = e.target;
    if (targeted.classList.contains('add-group')) {
        cntGroup++;
        createGroup();
    }
    if (targeted.classList.contains('title')) {
        e.stopPropagation();
        targeted.style.cursor = 'default';
    }
    if (targeted.closest('.deleteIcon')) {
        e.stopPropagation();
        if (confirm(`
        Nguyễn Sơn Tùng-20204804
        Bạn có muốn xóa thông tin này hay không?
        `)) {
            const idDlt = targeted.getAttribute('className')
            const elementDlt = document.getElementById(idDlt);
            if (elementDlt) {
                elementDlt.remove();
            }
        };
    }
    if (targeted.classList.contains('add-info')) {
        const idGroup = targeted.getAttribute('className');
        cntItem++;
        createItem(idGroup);
    };
    if (targeted.closest('.delete-info')) {
        e.stopPropagation();
        if (confirm(`
        Nguyễn Sơn Tùng-20204804
        Bạn có muốn xóa thông tin này hay không?
        `)) {
            const cntItem = targeted.getAttribute('cntItem')
            const elementDlt = document.querySelector(`[cntItem="${cntItem}"]`)
            if (elementDlt) {
                elementDlt.remove();
            }
        };
    }

}

mainContainer.onmouseover = function (e) {
    var targeted = e.target;
    if (targeted.classList.contains('title') || targeted.classList.contains('info-item')) {
        targeted.classList.add('hovered')
        targeted.style.cursor = 'default';
    }
}
mainContainer.onmouseout = function (e) {
    var targeted = e.target;
    if (targeted.classList.contains('title') || targeted.classList.contains('info-item')) {
        targeted.classList.remove('hovered')
    }
}
mainContainer.onmousedown = function (e) {
    var targeted = e.target;
    if (targeted.classList.contains('title') || targeted.classList.contains('info-item')) {
        targeted.classList.add('mousedown')
    }
}
mainContainer.ondblclick = function (e) {
    var targeted = e.target;
    if (targeted.classList.contains('title')) {
        var inputReplace = document.createElement('input');
        inputReplace.setAttribute('type', 'text');
        inputReplace.setAttribute('placeholder', 'New Group Item');
        targeted.parentNode.replaceChild(inputReplace, targeted);
        inputReplace.focus();
        inputReplace.classList.add('input-replace');
    }
    if (targeted.classList.contains('info-item')) {
        var inputInfoReplace = document.createElement('input');
        inputInfoReplace.setAttribute('type', 'text');
        inputInfoReplace.setAttribute('placeholder', 'New Info Item');
        targeted.parentNode.replaceChild(inputInfoReplace, targeted);
        inputInfoReplace.focus();
        inputInfoReplace.classList.add('input-info-replace');
    }
}
mainContainer.onkeydown = function (e) {
    var targeted = e.target;
    if (targeted.classList.contains('input-replace') && e.keyCode == 13) {
        e.preventDefault();
        let h3Element = document.createElement('h3');
        h3Element.innerHTML = targeted.value + '_20204804';
        h3Element.classList.add('title');
        targeted.parentNode.replaceChild(h3Element, targeted);
    }
    if (targeted.classList.contains('input-info-replace') && e.keyCode == 13) {
        e.preventDefault();
        let pElement = document.createElement('p');
        pElement.innerHTML = targeted.value;
        targeted.parentNode.replaceChild(pElement, targeted);
        pElement.classList.add('info-item');
    }
    if (targeted.classList.contains('input-item') && e.keyCode == 13) {
        e.preventDefault();
        let pElement = document.createElement('p');
        pElement.innerHTML = targeted.value;
        targeted.parentNode.replaceChild(pElement, targeted);
        pElement.classList.add('info-item');
    }
}

//export to pdf
$('#export-pdf-btn').click(function () {
    const element = document.documentElement;
    const options = {
        margin: 0,
        filename: 'Thong_tin_ca_nhan.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 1.0 },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' }
    };
    html2pdf().from(element).set(options).save();
});

