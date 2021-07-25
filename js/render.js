
const container = document.querySelector('.testcontent__render');
const testBtn = document.querySelector('.test__button');
const countValue = document.querySelector('.count-value');
const apiLength = document.querySelector('.api-length');
const myRange = document.querySelector('.myrange')
const Contact = document.querySelector('.contact');

// let a = 0



fetch("https://jsonplaceholder.typicode.com/comments?_limit")
    .then(res => res.json())
    .then(respons => {


        containerWrite(respons)
        let n = 10;
        apiLength.textContent = respons.length
        let sliderSum = (1000 / respons.length);
        let sliderSums = sliderSum;
        countValue.textContent = n;
        myRange.style.width = `${sliderSum}%`;


        testBtn.addEventListener('click', (e) => {

            sliderSums += sliderSum;
            myRange.style.width = `${sliderSums}%`;
            let raundomNumber = Math.round(sliderSums)

            if (raundomNumber == 100) {
                e.target.style.display = "none";
                Contact.style.display = "block"
            }
            

            for (let i = 0; i < 10; i++) {

                if ((n < respons.length)) {
                    if (container.children.length == 10) {
                        container.textContent = ''
                    }

                    countValue.textContent = n + 1;
                    container.innerHTML +=
                        `
                    <div class="testcontent__row">
                    <div class="testcontent__header">
                        <div class="number">${respons[n].id}</div>
                        <div class="title">${respons[n].id}</div>
                    </div>
                    <label class="circle-radio">
                    <div class="testcontent__col">
                        <div class="col-left">
                            <label class="circle-radio">
                                <input class="check" type="checkbox" name="nameId">
                                <span class="radio">
                                    <img src="img/test/check.png" alt="test">
                                </span>
                            </label>
                        </div>
                        <div class="col-right">  ${respons[n].id}</div>
                    </div>
                    </label>
                    <label class="circle-radio">
                    <div class="testcontent__col">
                        <div class="col-left">
                            <label class="circle-radio">
                                <input class="check" type="checkbox" name="1">
                                <span class="radio">
                                    <img src="img/test/check.png" alt="test">
                                </span>
                            </label>
                        </div>
                        <div class="col-right">  ${respons[n].id}</div>
                    </div>
                    </label>
                    
                    </div>

                `
                    n++;
                }
            }
        })
    })
    .catch(() => console.log('Error'))




function containerWrite(res) {
    for (let i = 0; i < 10; i++) {
        container.innerHTML +=
            `
            <div class="testcontent__row">
            <div class="testcontent__header">
                <div class="number">${res[i].id}</div>
                <div class="title">${res[i].id}</div>
            </div>
            <label class="circle-radio">
            <div class="testcontent__col">
                <div class="col-left">
                    <label class="circle-radio">
                        <input class="check" type="checkbox" name="1">
                        <span class="radio">
                            <img src="img/test/check.png" alt="test">
                        </span>
                    </label>
                </div>
                <div class="col-right">  ${res[i].id}</div>
            </div>
            </label>
            <label class="circle-radio">
            <div class="testcontent__col">
                <div class="col-left">
                    <label class="circle-radio">
                        <input class="check" type="checkbox" name="1">
                        <span class="radio">
                            <img src="img/test/check.png" alt="test">
                        </span>
                    </label>
                </div>
                <div class="col-right">  ${res[i].id}</div>
            </div>
            <label>
           
            </div>
    
        `
    }
}


