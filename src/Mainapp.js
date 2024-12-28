import { Box, Button, Card, Checkbox, Divider, FormControl, FormLabel, IconButton, List, ListItem, TextField } from '@mui/material';
import { Container } from '@mui/system'		//hamintor inaro ham dare {styled, createTheme, ThemeProvider}
import Grid from '@mui/system/Unstable_Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useEffect, useRef, useState } from 'react';

function Mainapp() {
	const [inputvalue, setInputvalue] = useState('')
	var todoStorage = localStorage.getItem('todo')
	var todoArr = JSON.parse(todoStorage)
	var todo = useRef(localStorage.getItem('todo') == null ? [] : todoArr)
	// var [checkedTodo, setcheckedTodo] = useState([])
	var checkedTodoStorage = localStorage.getItem('checkedTodo')
	var checkedTodoArr = JSON.parse(checkedTodoStorage)
	var checkedTodo = useRef(localStorage.getItem('checkedTodo') == null ? [] : checkedTodoArr)
	var checkboxStorage = localStorage.getItem('checkboxtick')
	var checkboxArr = JSON.parse(checkboxStorage)
	var checkbox = useRef(localStorage.getItem('checkboxtick') == null ? [] : checkboxArr)
	var doingTodoStorage = localStorage.getItem('doingTodo')
	var doingTodoStorage = JSON.parse(doingTodoStorage)
	var doingTodo = useRef(localStorage.getItem('doingTodo') == null ? [] : doingTodoStorage)
	const [doneKey, setDoneKey] = useState(false)
	const [doingKey, setDoingKey] = useState(false)
	const [error, setError] = useState(false)
	var [check, setCheck] = useState(false)
	var [editMode, setEditMode] = useState(false)
	var editTodo = useRef(null)
	var edittext = useRef('')


	useEffect(() => {

	}, [inputvalue, doingTodo, doneKey, doingKey, check])

	const add = () => {
		if (inputvalue != '') {
			setError(false)
			todo.current = [...todo.current, inputvalue]
			setInputvalue('')
			localStorage.setItem('todo', [JSON.stringify(todo.current)])
		}
		else { setError(true) }
	}

	const remove = (index) => {
		todo.current.splice(index, 1)
		var checkboxTempIndex;
		checkbox.current.forEach((v) => { if (v.id == index) return checkboxTempIndex = v.id })
		/* if (checkbox.current.forEach((v) => { if (v.id == index) return true })) {
			checkbox.current.forEach(v => v.id = v.id - 1)
		} */
		if (checkboxTempIndex != undefined) {
			checkbox.current.splice(checkboxTempIndex, 1)
		}
		var checkedTodoTempIndex;
		checkedTodo.current.forEach((v) => { if (v.id == index) return checkedTodoTempIndex = v.id })
		/* if (checkedTodo.current.forEach((v) => { if (v.id == index) return true })) {
			checkedTodo.current.forEach(v => v.id = v.id - 1)
		} */
		if (checkedTodoTempIndex != undefined) {
			checkedTodo.current.splice(checkedTodoTempIndex, 1)
		}
		localStorage.setItem('todo', [JSON.stringify(todo.current)])
		localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo.current)])
		localStorage.setItem('checkboxtick', [JSON.stringify(checkbox.current)])
	}

	function edit(index) {
		// todo.current[index]
		editTodo.current = index
		setEditMode(true)
	}

	const done = (value, index, e) => {
		if (e.target.checked == true) {
			// agar az setcheckedTodo bejaye useRef() baraye update estefade konim, comp Checkbox tick nemikhore va update nemishe, talash nakonim nemishe!
			checkedTodo.current = [...checkedTodo.current, { id: index, val: value }]
			checkbox.current = [...checkbox.current, { id: index, is: true }]
			// setTodo(todo.find(val => {if(val.text == value) return {text: value, filter: 'true'}}))
			localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo.current)])
			localStorage.setItem('checkboxtick', [JSON.stringify(checkbox.current)])
		} else if (checkedTodo.current.every((v) => { if (v.id == index) return false }) == false) {
			var checkboxTempIndex;
			// checkedTodo.current = checkedTodo.current.toSpliced(checkedTodo.current.indexOf(index), 1)
			checkbox.current.forEach((v, inx) => { if (v.id == index) return checkboxTempIndex = inx })
			checkedTodo.current.splice(checkboxTempIndex, 1)
			checkbox.current.splice(checkboxTempIndex, 1)
			localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo.current)])
			localStorage.setItem('checkboxtick', [JSON.stringify(checkbox.current)])
			// checkbox.current = checkbox.current.splice(checkbox.current.indexOf(index), 1)
			// delete checkbox.current[1]
		}
	}

	const doing = () => {
		var todoTemp = todo.current.flatMap(v => v)
		for (var index in todoTemp) {
			for (var v of checkedTodo.current) {
				if (index == v.id) {
					// t.splice(1, 1)
					delete todoTemp[index]
					break
				}
			}
		}
		doingTodo.current = todoTemp
		localStorage.setItem('doingTodo', [JSON.stringify(todoTemp)])
		if (doneKey == true) {
			setDoneKey(false)
		}
		setDoingKey(true)
	}

	function editAccept(index) {
		todo.current[index] = edittext.current;
		setEditMode(false);
		localStorage.setItem('todo', [JSON.stringify(todo.current)])
		localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo.current)])
		localStorage.setItem('checkboxtick', [JSON.stringify(checkbox.current)])
		localStorage.setItem('doingTodo', [JSON.stringify(doingTodo.current)])
	}

	function donefilter() {
		// setTodo(todo.filter((value, index) => value == 'aa'))
		/* var x = ''
		for (let i in checkedTodo) {
			if (todo != [] && checkedTodo != []) {
				if (checkedTodo[i].val == todo[checkedTodo[i].id]) {
					setfiltered([checkedTodo[i].val])
				}
			}
		} */
		// todo.filter((value, index) => checkedTodo.forEach((v) => {return x = v.val}))
	}

	function Todo() {
		// if (checkedTodo.current.length != 0 && doneKey == true) {
		if (doneKey == true) {
			return checkedTodo.current.map((value, index) =>
				<div key={index}>
					<ListItem>
						<del style={{ textDecorationStyle: 'double', textAlign: 'start', width: '100%' }}>{value.val}</del>
						<IconButton color='error' onClick={() => remove(index)}><DeleteIcon /></IconButton>
					</ListItem>
					<Divider />
				</div>
			)
		}
		else if (doingKey == true) {
			return doingTodo.current.map((value, index) =>
				<div key={index}>
					{/* <ListItem><Checkbox onClick={(e) => { done(index, e) }} /><p style={{ textDecoration: (checkedTodo.current.some((v) => { if (v.val == todo[index]) return true }) == true) ? 'line-through' : 'none' }}>{value}</p></ListItem> */}
					<ListItem>
						<span style={{width: '100%', textAlign: 'start'}}>{value}</span>
						<IconButton color='warning'><HourglassBottomIcon /></IconButton>
					</ListItem>
					<Divider />
				</div>
			)
		}
		else if (todo.current != null) {
			return todo.current.map((value, index) => <div key={index}>
				<ListItem sx={{ display: 'flex' }}>
					{(editTodo.current == index && editMode == true) ? <>
						<TextField variant='outlined' size='small' defaultValue={todo.current[index]} onChange={(e) => edittext.current = e.target.value} sx={{ width: '100%' }} />
						<IconButton sx={{ alignContent: 'end' }} color='info' onClick={() => { editAccept(index); setCheck(!check) }}><DoneIcon /></IconButton>

					</> : <>
						<Checkbox onClick={(e) => { done(value, index, e); setCheck(!check) }} checked={Boolean(checkbox.current.find(v => v.id == index))} />
						<span style={{ textDecoration: (checkedTodo.current.some((v) => { if (v.val == todo.current[index]) return true }) == true) ? 'line-through' : 'none', textDecorationStyle: 'double', width: '100%', textAlign: 'start', padding: '0 0.5rem' }}>{value}</span>
						<IconButton sx={{ alignContent: 'end' }} color='success' onClick={() => { edit(index); setCheck(!check) }}><EditIcon /></IconButton>
						<IconButton sx={{ alignContent: 'end' }} color='error' onClick={() => { remove(index); setCheck(!check) }}><DeleteIcon /></IconButton>
					</>
					}
				</ListItem>
				<Divider />
			</div>
			)
		}
	}

	return (
		<Container sx={{ py: '2rem' }}>
			<Grid container justifyContent={'center'}>
				<Grid md={6} sm={8} xs={12}>
					<Box sx={{ mx: 'auto' }}>
						<Card sx={{ p: '1.5rem', bgcolor: '#fdfdfd' }}>
							<h2 style={{ textAlign: 'center', marginTop: '0' }}>To Do List</h2>
							<Grid container sx={{ flexDirection: 'column', rowGap: '0.5rem' }}>
								<Grid container flexWrap={'nowrap'}>
									<FormControl sx={{ flexGrow: 1, pt: '3px', '& .MuiInputBase-root': { height: '36px' } }}>
										<TextField sx={{ width: '100%' }} variant='outlined' size='small' placeholder='کار جدید اضافه کنید ...' value={inputvalue} onChange={(e) => { setInputvalue(e.target.value) }} />
										<FormLabel sx={{ pt: '0.5rem', color: 'red', display: error == true ? 'block' : 'none' }}>مقدار خالی وارد نکنید!</FormLabel>
									</FormControl>
									<IconButton color='info' onClick={() => add()}><AddCircleOutlineIcon /></IconButton>
								</Grid>
								<Grid container flexWrap={'nowrap'} sx={{ gap: '0.5rem' }} id='btngrid'>
									<Grid xs={4}>
										<Button variant='outlined' id='btn1' sx={{ minWidth: '100%', bgcolor: (doingKey == false && doneKey == false) ? '#d7ecff' : '' }} onClick={() => { setDoingKey(false); setDoneKey(false) }}>همه</Button>
									</Grid>
									<Grid xs={4}>
										<Button variant='outlined' id='btn2' sx={{ minWidth: '100%', bgcolor: (doingKey == true && doneKey == false) ? '#d7ecff' : '#fff' }} onClick={() => doing()}>در حال انجام</Button>
									</Grid>
									<Grid xs={4}>
										<Button variant='outlined' id='btn3' sx={{ minWidth: '100%', bgcolor: doneKey == true ? '#d7ecff' : '#fff' }} onClick={() => setDoneKey(true)}>انجام شده</Button>
									</Grid>
								</Grid>
							</Grid>
							<List>{<Todo />}</List>
						</Card>
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Mainapp