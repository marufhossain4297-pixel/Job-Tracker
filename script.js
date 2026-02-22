let interviewList = [];
let rejectedList = []
const filterSection = document.getElementById('filter-section')
const noJobs = document.getElementById('no-jobs')

let total = document.getElementById('total');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');
let availableJobs = document.getElementById('available-jobs-value')


const allBtn = document.getElementById('all-btn')
const interviewBtn = document.getElementById('interview-btn')
const rejectedBtn = document.getElementById('rejected-btn')

const mainContainer = document.querySelector('main')

const allCardSection = document.getElementById('all-card');
console.log(allCardSection.children.length)
function calculateCount() {
    total.innerText = allCardSection.children.length;
    availableJobs.innerText = allCardSection.children.length;
    
    interview.innerText = interviewList.length
    rejected.innerText = rejectedList.length
}
calculateCount()

function toggleStyle(id) {
    allBtn.classList.add('bg-white', 'text-[#64748B]')
    interviewBtn.classList.add('bg-white', 'text-[#64748B]')
    rejectedBtn.classList.add('bg-white', 'text-[#64748B]')


    allBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white')

    const selected = document.getElementById(id)
    selected.classList.remove('bg-white', 'text-[#64748B]')
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    if(id == 'interview-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
    }
    else if(id == 'all-btn'){
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
}

mainContainer.addEventListener('click', function (event) {
    const parentNode = event.target.parentNode.parentNode
    if (event.target.classList.contains('interview-btn')) {
        const companyName = parentNode.querySelector('.company-name').innerText
        const position = parentNode.querySelector('.position').innerText
        const work = parentNode.querySelector('.work').innerText
        const statusBar = parentNode.querySelector('.status-bar').innerText
        const note = parentNode.querySelector('.note').innerText
        const statusBarStyle = parentNode.querySelector('.status-bar').innerText = 'INTERVIEW'
        statusBarStyle.style.backGroundColor = 'red'
        // console.log(companyName, position, work, statusBar, note)


        const cardInfo = {
            companyName,
            position,
            work,
            statusBar: 'INTERVIEW',
            note
        }

        const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            interviewList.push(cardInfo)
        }
        calculateCount()
        renderInterview()
    }
})


if(filterSection != ''){
    noJobs.classList.remove('hidden')
}

function renderInterview() {
    filterSection.innerHTML = ''

    for (let interview of interviewList) {
        console.log(interview)
        let div = document.createElement('div')
        div.className = 'flex justify-between border border-[#E6E7E9] rounded-lg p-6 '
        div.innerHTML = `
        <div class="space-y-5">
                    <!-- part 1 -->
                    <div>
                        <p class="company-name text-[18px] font-semibold text-[#002C5C]">${interview.companyName}</p>
                        <p class="position text-[#64748B]">${interview.position}</p>
                    </div>
                    <!-- part 2 -->
                    <div>
                        <p class="work text-[#64748B]">${interview.work}</p>
                    </div>
                    <!-- part 3 -->
                    <div>
                        <p class="status-bar bg-[#EEF4FF] px-3 py-2 text-[14px] rounded-sm w-[113px] mb-2 font-medium">
                            ${interview.statusBar}
                        </p>
                        <p class="note">${interview.note}</p>
                    </div>

                    <!-- part 4 -->
                    <div>
                        <button
                            class="interview-btn btn font-semibold text-[14px] mr-2 md:bg-transparent md:text-[#10B981] md:border md:border-[#10B981] hover:bg-[#10B981] hover:text-white hover:cursor-pointer px-3 py-2 rounded-sm bg-[#10B981] text-white">INTERVIEW
                        </button>

                        <button
                            class="reject-btn font-semibold btn text-[14px] md:text-[#EF4444] md:border md:border-[#EF4444] hover:cursor-pointer hover:bg-[#EF4444] md:bg-transparent hover:text-white px-3 py-2 rounded-sm bg-[#EF4444] text-white">REJECTED
                        </button>
                    </div>
                    
        `

        filterSection.appendChild(div)
    }
}