import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"

const Write = ({ list, setList, idRef }) => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    //글자수 더 입력하게 창 띄우고 그곳에 포커스 가게 하는 방법
    const input = useRef([]);

    console.log(inputs);

    //작성시간 가져오기 js
    const time = new Date();

    const inputHandler = e => {
        const { name, value } = e.target;
        setInputs(
            {
                id: idRef.current,
                ...inputs,
                [name]: value,
                date: time.toLocaleDateString //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date 참고
            }
        )
    }

    // submit 새로고침 이벤트 막기
    const onSubmit = e => {
        e.preventDefault();
        for (let i = 0; i < input.current.length; i++) {
            if (input.current[i].value.length < 5) {
                alert(`${input.current[i].name}을 더 넣어주세요`);
                input.current[i].focus();
                return
            }

        }

        //한글로 입력하라 하는거 정규식 검색

        // if (inputs.subject.length < 3) {
        //     alert('제목을 더 넣어주세요');
        //     //글자수 더 입력하게 창 띄우고 그곳에 포커스 가게 하는 방법
        //     input.current[0].focus();
        //     return
        // }



        // 글쓴거를 list에 옮기기
        setList([
            ...list,
            inputs
        ]);

        idRef.current = idRef.current + 1;

        navigate('/list')
    }


    return (
        <>
            <h2>글쓰기</h2>
            <form onSubmit={onSubmit}>
                <ul>
                    <li>
                        {/* label쓰면 제목글씨 클릭해서 input 커서 간다 */}
                        <label htmlFor="subject">제목</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            onChange={inputHandler}
                            //글자를 1자도 안넣으면 입력하게 알림창 뜨게하는 required
                            required
                            //글자수 더 입력하게 창 띄우고 그곳에 포커스 가게 하는 방법
                            ref={el => input.current[0] = el}
                        />
                    </li>
                    <li>
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[1] = el}
                        />
                    </li>
                    <li>
                        <label htmlFor="content">내용</label>
                        <textarea
                            type="text"
                            id="content"
                            name="content"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[2] = el}
                        />
                    </li>
                </ul>
                <button>write</button>
            </form>
        </>
    )
}

export default Write;

