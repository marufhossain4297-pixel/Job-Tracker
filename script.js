let interviewList = [];
let rejectedList = []
let currentStatus = 'all-btn'

const filterSection = document.getElementById('filter-section')
const noJobs = document.getElementById('no-jobs')


let total = document.getElementById('total');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');
let availableJobs = document.getElementById('available-jobs-value')
let totalJobsValue = document.getElementById('total-jobs-value');

const allBtn = document.getElementById('all-btn')
const interviewBtn = document.getElementById('interview-btn')
const rejectedBtn = document.getElementById('rejected-btn')

const mainContainer = document.querySelector('main')

const allCardSection = document.getElementById('all-card');
console.log(allCardSection.children.length)
function calculateCount() {

    const totalJobs = allCardSection.children.length;

    total.innerText = totalJobs;
    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;

    let currentTabCount = totalJobs;

    if (currentStatus === 'interview-btn') {
        currentTabCount = interviewList.length;
    }
    else if (currentStatus === 'rejected-btn') {
        currentTabCount = rejectedList.length;
    }

    availableJobs.innerText = currentTabCount;
    totalJobsValue.innerText = totalJobs;
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
    currentStatus = id

    selected.classList.remove('bg-white', 'text-[#64748B]')
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    if (id == 'interview-btn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderInterview()
    }
    else if (id == 'all-btn') {
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
    else if (id == 'rejected-btn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderReject()
    }

    calculateCount();
}

mainContainer.addEventListener('click', function (event) {
    const parentNode = event.target.parentNode.parentNode
    if (event.target.classList.contains('interview-btn')) {
        const companyName = parentNode.querySelector('.company-name').innerText
        const position = parentNode.querySelector('.position').innerText
        const work = parentNode.querySelector('.work').innerText
        const statusBar = parentNode.querySelector('.status-bar').innerText
        const note = parentNode.querySelector('.note').innerText
        const statusIn = parentNode.querySelector('.status-bar')
        statusIn.innerText = 'INTERVIEW'
        // remove old colors
        statusIn.classList.remove('bg-[#EEF4FF]', 'bg-red-100', 'text-red-600', 'px-3', 'py-2', 'border-[#EF4444]')

        // add green
        statusIn.classList.add('bg-[#EBFDF5]', 'text-[#11B981]', 'border', 'border-[#11B981]', 'w-[68.945px]', 'text-center', 'py-[4px]', 'font-semibold')
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

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName)
        calculateCount()

        if (currentStatus == 'rejected-btn') {
            renderReject()
        }
    }

    else if (event.target.classList.contains('reject-btn')) {
        const companyName = parentNode.querySelector('.company-name').innerText
        const position = parentNode.querySelector('.position').innerText
        const work = parentNode.querySelector('.work').innerText
        const statusBar = parentNode.querySelector('.status-bar').innerText
        const note = parentNode.querySelector('.note').innerText
        const statusRe = parentNode.querySelector('.status-bar')

        statusRe.innerText = 'REJECTED'

        // remove old colors
        statusRe.classList.remove('bg-[#EEF4FF]', 'bg-green-100', 'text-green-600')

        // add red
        statusRe.classList.add('bg-red-100', 'text-red-600', 'border', 'border-[#EF4444]')
        // console.log(companyName, position, work, statusBar, note)


        const cardInfo = {
            companyName,
            position,
            work,
            statusBar: 'REJECTED',
            note
        }

        const companyExist = rejectedList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)
        calculateCount()

        if (currentStatus == 'interview-btn') {
            renderInterview()
        }
    }
    else if (event.target.closest('.delete-btn')) {
        const card = event.target.closest('.flex.justify-between');

        const name = card.querySelector('.company-name').innerText;
        alert('Are you sure you want to delete this application?' + name)

        interviewList = interviewList.filter(item => item.companyName !== name);
        rejectedList = rejectedList.filter(item => item.companyName !== name);

        card.parentNode.removeChild(card);

        calculateCount();
        if (currentStatus === 'interview-btn') renderInterview();
        if (currentStatus === 'rejected-btn') renderReject();
    }
})


function renderInterview() {
    filterSection.innerHTML = ''
    if (interviewList.length == 0) {
        filterSection.innerHTML = `
        <div id="no-jobs" class="text-center justify-self-center w-full border h bg-white border-[#E6E7E9] border-dashed py-[110px] rounded-2xl">
                <img class="justify-self-center" src="./jobs.png" alt="">
                <p class="text-[24px]  text-[#002C5C] font-semibold">No jobs available</p>
                <p class="text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
        `
    }
    for (let interview of interviewList) {
        console.log(interview)
        let div = document.createElement('div')
        div.className = 'flex justify-between border border-[#E6E7E9] rounded-lg p-6 '
        div.innerHTML = `
        <div class= "flex justify-between w-full">
            <div class="space-y-5 bg-whte">
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
                        <p class="status-bar bg-[#EBFDF5] text-[#11B981] border border-[#11B981] w-[113px] text-center py-1 font-semibold text-[14px] rounded-sm mb-2">${interview.statusBar}</p>
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
            </div>

                <div>
                    <span
                        class="delete-btn material-symbols-outlined border btn border-[#E6E7E9] hover:bg-[#EF4444] hover:text-white rounded-full p-2 hover:cursor-pointer">delete
                    </span>
                </div> 

        </div>        
                    
        `

        filterSection.appendChild(div)
    }
}


function renderReject() {
    filterSection.innerHTML = ''

    if (rejectedList.length == 0) {
        filterSection.innerHTML = `
        <div id="no-jobs" class="text-center justify-self-center w-full border h bg-white border-[#E6E7E9] border-dashed py-[110px] rounded-2xl">
                <img class="justify-self-center" src="./jobs.png" alt="">
                <p class="text-[24px]  text-[#002C5C] font-semibold">No jobs available</p>
                <p class="text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
        `
    }

    for (let reject of rejectedList) {
        console.log(reject)
        let div = document.createElement('div')
        div.className = 'flex justify-between border border-[#E6E7E9] rounded-lg p-6 '
        div.innerHTML = `
        <div class= "flex justify-between w-full">
            <div class="space-y-5">
                    <!-- part 1 -->
                    <div>
                        <p class="company-name text-[18px] font-semibold text-[#002C5C]">${reject.companyName}</p>
                        <p class="position text-[#64748B]">${reject.position}</p>
                    </div>
                    <!-- part 2 -->
                    <div>
                        <p class="work text-[#64748B]">${reject.work}</p>
                    </div>
                    <!-- part 3 -->
                    <div>
                        <p class="status-bar bg-red-100 text-red-600 border border-[#EF4444] w-[113px] text-center py-1 font-semibold text-[14px] rounded-sm mb-2">
                            ${reject.statusBar}
                        </p>
                        <p class="note">${reject.note}</p>
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
            </div>

                <div>
                    <span
                        class="delete-btn material-symbols-outlined border btn border-[#E6E7E9] hover:bg-[#EF4444] hover:text-white rounded-full p-2 hover:cursor-pointer">delete
                    </span>
                </div> 

        </div>        
                    
        `

        filterSection.appendChild(div)
    }
}