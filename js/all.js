let app = new Vue({
    el: '.wrap',
    data: {
        description: '',
        degree: {},
        traitsEn: [],
        traitsZh: [],
        problems: [],
        traitDescription: {},
        questionIndex: -1,
        resultIndex: 0,
        showResult: false
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            const vm = this;
            const url = 'https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json'
            axios.get(url)
                .then( response => {
                    vm.description = response.data.description;
                    vm.degree = response.data.degree;
                    vm.traitsEn = response.data.traits.en;
                    vm.traitsZh = response.data.traits.zh;
                    vm.traitsEn.forEach( item => {
                        response.data.problemList[item].problems.forEach( problem => {
                            vm.problems.push({
                                id: problem.id,
                                category: problem.category,
                                problem: problem.problem,
                                options: problem.options,
                                score: 0
                            });
                        });
                        vm.$set(vm.traitDescription, item, {
                            traitEn: item,
                            traitZh: response.data.problemList[item].name,
                            desc: response.data.problemList[item].description.desc,
                            high: response.data.problemList[item].description.high,
                            low: response.data.problemList[item].description.low,
                            middle: response.data.problemList[item].description.middle,
                            score: 0
                        });
                    });
                    console.log(vm.traitDescription);
                });
        },
        nextPage(id) {
            if (document.querySelector(`input[name="${id}"]:checked`)) {
                this.questionIndex += 1;
            } else {
                alert('您尚未選擇答案');
            }
        },
        getResult(id) {
            const vm = this;
            if (document.querySelector(`input[name="${id}"]:checked`)) {
                this.questionIndex += 1;
                vm.showResult = true;
                console.log(vm.problems);
                vm.traitsEn.forEach( trait => {
                    vm.problems.forEach( problem => {
                        if (trait === problem.category){
                            vm.traitDescription[trait].score += problem.score; //把分數放進去scores
                        }
                    });
                });
            } else {
                alert('您尚未選擇答案');
            }
            console.log(vm.traitDescription);
        },
        render() {

        },
        reset(){
            this.questionIndex = -1,
            this.showResult = false;
            this.getData();
            this.problems.forEach( (problem) => {
                problem.score = 0;
            });
        }
    }
})