import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import running from '../img/mascot1.png';
import styles from '../styles/SearchRes.module.css';

function SearchRes() {

  const [filterText, setFilterText] = useState("");
  const [policyList, setpolicyList] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // POST 요청에 사용할 데이터
        const requestData = {
          birthDate: "2000.02.21",
          residence: 2,
          is_married: false,
          child_count: 0,
        };

        // 서버에 POST 요청을 보냅니다.
        const response = await axios.post(
          "http://Server-env.eba-icmaspkc.ap-northeast-2.elasticbeanstalk.com/gpt/recommendPolicies",
          requestData
        );

        // 응답에서 result가 존재하고 policies 배열이 있는지 확인
        if (response.data.result && Array.isArray(response.data.result.policies)) {
          setpolicyList(response.data.result.policies);
        } else {
        }
      } catch (error) {
        // 오류가 발생하면 error 상태에 메시지를 저장합니다.
      } finally {
        // 로딩이 끝났음을 알리기 위해 loading 상태를 false로 설정합니다.
        setLoading(false);
      }
    };

    fetchPolicies(); // 컴포넌트가 마운트될 때 fetchPolicies 함수를 호출합니다.
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출되도록 합니다.

  // 필터링된 정책 목록을 생성
  const filteredPolicies = filterText === ""
    ? policyList // 필터 텍스트가 없을 때 모든 정책을 보여줍니다.
    : policyList.filter(policy =>
        policy.type.includes(filterText) // 필터 텍스트가 있을 때 type과 일치하는 정책만 보여줍니다.
      );

  return (
    <div className={styles.back}>
      <div style={{
        marginTop:"80px",
        width:"1600px",
        height:"200px",
        
      }}>{!loading && <div>
        <div className={styles.title}>복지정책이 도착했습니다. 확인해주세요!</div>
          <div style={{
            marginTop:"1vh",
            width:window.screen.width
          }}>
          <div className={styles.filter}>필터
               <input className={styles.box} type='text'
               value={filterText}
              onChange={(e) => setFilterText(e.target.value)}></input>
          </div>
        </div></div>}
        {loading && <div>
        <div className={styles.title}>열심히 찾는 중이에요.</div>
          <div style={{
            marginTop:"1vh",
            width:window.screen.width
          }}>
        </div></div>}
        <div className={styles.contentwrap}>
        {loading ? (
          <div style={{
            justifyContent:"center",
            display:"flex"
          }}>
            <img
            className={styles.loding}
            src={running}
            alt='loding'
            />
            </div>
          ) : (
            filteredPolicies.map((policy, index) => (
              <div key={index} className={styles.content}>
                <div>{policy.name}</div>
                <span>종류: {policy.type}<br /></span>
                <span>기간: {policy.startTime} ~ {policy.endTime}<br /></span>
                <span>대상: {policy.target}<br /></span>
                <span>내용: {policy.description}<br /></span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchRes