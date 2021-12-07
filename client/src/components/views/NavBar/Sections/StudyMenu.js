import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Menu, Button, Space} from 'antd';

function StudyMenu() {
	
	const [ElapsedTime, setElapsedTime] = useState(0);
	const [Pause, setPause] = useState(false);
	const [Studying, setStudying] = useState(false);

	useEffect(() => {
		
		Axios.get('/api/studying')
			.then((response) => {
			if (response.data.success) {
				if(response.data.isStudyingNow) {
					setElapsedTime(response.data.elapsedTime)
					setPause(response.data.isPaused)
				}
				setStudying(response.data.isStudyingNow)
			} else {
				alert('공부상태 가져오기를 실패했습니다.');
			}
		});
	}, []);
	
	const onStart = (event) => {
		event.preventDefault();
		
		Axios.post('/api/studying/start', {category: 'programming'})
			.then(response => {
			if(response.data.success) {
				setElapsedTime(response.data.elapsedTime)
				setStudying(response.data.isStudyingNow)
			} else {
				alert(response.data.message)
			}
		})
	}
	
	const onStop = (event) => {
		event.preventDefault();
		
		Axios.get('/api/studying/end')
			.then(response => {
			if(response.data.success) {
				setElapsedTime(response.data.elapsedTime)
				setStudying(false)
			} else {
				alert(response.data.message)
			}
		})
	}
	
	const onPause = (event) => {
		event.preventDefault();
		
		Axios.get('/api/studying/pause')
			.then(response => {
			if(response.data.success) {
				setElapsedTime(response.data.elapsedTime)
				setPause(true)
			} else {
				alert(response.data.message)
			}
		})
	}
	
	const onResume = (event) => {
		event.preventDefault();
		
		Axios.get('/api/studying/resume')
			.then(response => {
			if(response.data.success) {
				setElapsedTime(response.data.elapsedTime)
				setPause(false)
			} else {
				alert(response.data.message)
			}
		})
	}
	
	return (
		<Menu>
			<Menu.Item key="1">
			<Space size='large'>
			{Studying ? 
				(
				Pause ?
				<Button type="primary" shape="circle" size="large" onClick={onResume}>
						재시작
   				</Button>
				:
				<Button type="primary" shape="circle" size="large" onClick={onPause}>
					일시정지
   				</Button>
				
			) :
				<Button type="primary" shape="circle" size="large" onClick={onStart}>
					시작
   				</Button>
			}
			<Button type="primary" size="large" onClick={onStop}>
				끝내기
   			</Button>
			</Space>
			</Menu.Item>
		</Menu>
	);
}

export default StudyMenu;