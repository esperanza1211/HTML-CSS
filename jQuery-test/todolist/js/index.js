class Medlo {
    constructor(){
        this.dataList = [
            {
                isfinish: false,
                text: '1'
            },
            {
                isfinish: false,
                text: '2'
            },
            {
                isfinish: false,
                text: '3'
            }
        ];
        this.ondatachange = function(){};
    };
    add(val) {
        this.dataList.push({
            isfinish: false,
            text: val
        })
        this.ondatachange();
    };
    change(index) {
        this.dataList[index].isfinish = !this.dataList[index].isfinish;
        this.ondatachange();
    };
    remove(index) {
        this.dataList.splice(index, 1);
        this.ondatachange();
    };
    edit(index, val) {
        this.dataList[index].text = val;
        this.ondatachange();
    }
    getCompletes() {
        return this.dataList.filter(function (item) {
            return item.isfinish
        }).length;
    };
    getUncompletes() {
        return this.dataList.filter(function (item) {
            return !item.isfinish
        }).length;
    }
    isCompleteAll() {
        return this.dataList.length == this.getCompletes();
    }
    setCompleteAll(state) {
        this.dataList.forEach(function (item) {
            item.isfinish = state;
        })
        this.ondatachange();
    }
    removeCompletes() {
        for(let i = this.dataList.length - 1; i >= 0; i--) {
            if(this.dataList[i].isfinish) {
                this.dataList.splice(i, 1);
            }
        }
        this.ondatachange();
    }
}

$(function () {
    let medlo = new Medlo();

    medlo.ondatachange = function () {
        setViewMain(this.dataList);
        setViewFoot(medlo.dataList);
    }
    setViewMain(medlo.dataList);
    setViewFoot(medlo.dataList);
    $('.text').keydown(function (e) {
        if (e.keyCode == 13
        && $(this).val().trim()) {
            medlo.add($(this).val());
            $(this).val('');
        }
    })

    function setViewMain(data) {
        if(data.length == 0) {
            $('#main').css("display", "none");
            return;
        }
        let inner = `
            <div class="box1">
            <input type="checkbox" id="checkAll" ${medlo.isCompleteAll()?"checked":""}>
            <span>全部选中</span>
            </div>
            <ul class="list">${getItem(data)}</ul>`;
        $('#main').css("display", "block");
        $('#main').html(inner);
        setevent();
    }

    function getItem(data) {
        let inner = '';
        data.forEach(function (val, index) {
            inner += (`
            <li><div>
            <input type="checkbox" class="check" ${val.isfinish?"checked":""}>
            <span class=${val.isfinish?"complete":""}>${val.text}</span>
            <strong>X</strong>
            </div>
            <input type="text" class="txt" value=${val.text}>
            </li>`);
        })
        return inner;
    }

    function setevent() {
        $("#checkAll").change(function () {
            medlo.setCompleteAll(this.checked);
        })
        $(".list li").mousemove(function () {
            $(this).children("div").children("strong").css("display","block");
        })
        $(".list li").mouseout(function () {
            $(this).children("div").children("strong").css("display","none");
        })
        $(".check").change(function () {
            let index = $(this).parent().parent().index();
            medlo.change(index);
        })
        $("strong").click(function () {
            let index = $(this).parent().parent().index();
            medlo.remove(index);
        })
        $(".list li div").dblclick(function () {
            $(this).css("display","none");
            $(this).next().css("display","block").select();
        })
        $(".txt").blur(function () {
            let index = $(this).parent().index();
            if($(this).val().trim() == '') {
                medlo.remove(index);
            } else {
                medlo.edit(index,$(this).val());
            }
        })
    }

    function setViewFoot(data) {
        if(data.length == 0) {
            $(".foot").css("display","none");
            return;
        }
        $(".foot").css("display","block");
        $(".foot").html(`
        <p class="uncompletes">未完成${medlo.getUncompletes()}项</p>
        <p class="completes" style="display:${medlo.getCompletes()==0?"none":"block"}">清除已完成${medlo.getCompletes()}项</p>`);
        $(".completes").click(function () {
            medlo.removeCompletes();
        })
    }
})










