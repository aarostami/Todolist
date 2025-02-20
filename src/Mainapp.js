import { Badge, Box, Button, Card, Checkbox, Divider, Drawer, FormControl, FormHelperText, FormLabel, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import { unstable_styleFunctionSx, createStyled, Container } from '@mui/system'		//hamintor inaro ham dare {styled, createTheme, ThemeProvider}
import Grid from '@mui/system/Unstable_Grid';
import { FilterDataAdvanced } from 'filter-data-advanced/dist/FilterDataAdvanced'
import { useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AllTodo from './components/AllTodo';
import Done from './components/Done';
import Doing from './components/Doing';

function Mainapp() {
	const [inputvalue, setInputvalue] = useState('')
	var todoStorage = localStorage.getItem('todo')
	var todoArr = JSON.parse(todoStorage)
	var [todo, setTodo] = useState(localStorage.getItem('todo') == null ? [] : todoArr)

	var checkedTodoStorage = localStorage.getItem('checkedTodo')
	var checkedTodoArr = JSON.parse(checkedTodoStorage)
	var [checkbox, setCheckBox] = useState(localStorage.getItem('checkedTodo') == null ? [] : checkedTodoArr)

	var checkboxStorage = localStorage.getItem('checkboxtick')
	var checkboxArr = JSON.parse(checkboxStorage)
	var [checkedTodo, setCheckedTodo] = useState(localStorage.getItem('checkboxtick') == null ? [] : checkboxArr)

	var doingTodoStorage = localStorage.getItem('doingTodo')
	var doingTodoStorage = JSON.parse(doingTodoStorage)
	var [doingTodo, setDoingTodo] = useState(localStorage.getItem('doingTodo') == null ? [] : doingTodoStorage)

	const [doneKey, setDoneKey] = useState(false)
	const [doingKey, setDoingKey] = useState(false)
	const [error, setError] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const editTodo = useRef(null)
	const edittext = useRef('')

	const add = () => {
		// setLang((prev) => [...prev, value]);
		if (inputvalue != '') {
			setError(false)
			setTodo([...todo, inputvalue])
			setInputvalue('')
			// localStorage.setItem('todo', [JSON.stringify(todo)])
		}
		else { setError(true) }
	}

	function edit(index) {
		editTodo.current = index
		setEditMode(true)
	}

	function editAccept(index) {
		if (edittext.current != '') {
			// todo[index] = edittext.current	//intori update khoob nist
			var todoTemp = todo
			todoTemp[index] = edittext.current
			setTodo(todoTemp);
			setEditMode(false);
			/* localStorage.setItem('todo', [JSON.stringify(todo)])
			localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo)])
			localStorage.setItem('checkboxtick', [JSON.stringify(checkbox)])
			localStorage.setItem('doingTodo', [JSON.stringify(doingTodo)]) */
		} else { setEditMode(false); }
	}

	const remove = (index) => {
		/* // remove unchecked value from the list
		setLang((prev) => prev.filter((x) => x !== value)); */
		setTodo(todo.toSpliced(index, 1))
		// setCheckedTodo(checkedTodo.toSpliced(index, 1))
		/* todo.current.map((value, todoindex) => {
			checkedTodo.current.forEach((v, i) => { v.id = todoindex; v.val = v.val })
			checkbox.current.forEach((v, i) => { v.id = todoindex; v.is = v.is })
		}) */
		var p;
		checkbox.forEach((v, num) => {
			if (v.id > index) { v.id = v.id - 1 }
			else if (v.id == index) {
				// rahe -1-
				checkbox.splice(num, 1)
				checkbox.forEach((t, i) => {
					if (num == i) { t.id = t.id - 1 }
				})

				// rahe -2-
				/* if (num == checkbox.current.length - 1 || checkbox.current.length == 1) {
					checkbox.current.splice(num, 1)
				}
				else {
					p = num
					checkbox.current.splice(num, 1)
					checkbox.current[p].id = checkbox.current[p].id - 1
				} */

				// rahe -3-
				/* if(num == checkbox.current.length - 1 || checkbox.current.length == 1) {
					checkbox.current.splice(num, 1)
				}
				else if (checkbox.current[num + 1] != undefined) {
					checkbox.current[num + 1].id = checkbox.current[num + 1].id - 1
					checkbox.current.splice(num, 1)
				} */
			}
		})

		var a;
		checkedTodo.forEach((v, num) => {
			if (v.id > index) { v.id = v.id - 1 }
			else if (v.id == index) {
				// rahe -1-
				checkedTodo.splice(num, 1)
				checkedTodo.forEach((t, i) => {
					if (num == i) { t.id = t.id - 1 }
				})

				// rahe -2-
				/* if (num == checkedTodo.current.length - 1 || checkedTodo.current.length == 1) {
					checkedTodo.current.splice(num, 1)
				}
				else {
					a = num
					checkedTodo.current.splice(num, 1)
					checkedTodo.current[a].id = checkedTodo.current[a].id - 1
				} */

				// rahe -3-
				/* if(num == checkedTodo.current.length - 1 || checkedTodo.current.length == 1) {
					checkedTodo.current.splice(num, 1)
				}
				else if (checkedTodo.current[num + 1] != undefined) {
					checkedTodo.current[num + 1].id = checkedTodo.current[num + 1].id - 1
					checkedTodo.current.splice(num, 1)
				} */
			}
		})
		/* localStorage.setItem('todo', [JSON.stringify(todo)])
		localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo)])
		localStorage.setItem('checkboxtick', [JSON.stringify(checkbox)]) */
	}

	const done = (value, index, e) => {
		if (e.target.checked == true) {
			// agar az setCheckedTodo bejaye useRef() baraye update estefade konim, comp Checkbox tick nemikhore va update nemishe, talash nakonim nemishe!
			setCheckedTodo([...checkedTodo, { id: index, val: value }])
			// checkbox.current = ([...checkbox.current, { id: index, is: true }])	//in ghalate
			// checkbox.current = [...checkbox.current, { id: index, is: true }]	//in doroste
			setCheckBox([...checkbox, { id: index, is: true }])
			// setTodo(todo.find(val => {if(val.text == value) return {text: value, filter: 'true'}}))
			/* localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo)])
			localStorage.setItem('checkboxtick', [JSON.stringify(checkbox)]) */
		} else if (checkedTodo.every((v) => { if (v.id == index) return false }) == false) {
			var checkboxTempIndex;
			// checkedTodo.current = checkedTodo.current.toSpliced(checkedTodo.current.indexOf(index), 1)
			checkbox.forEach((v, inx) => { if (v.id == index) return checkboxTempIndex = inx })
			// checkedTodo.splice(checkboxTempIndex, 1)		//chon ba setCheckedTodo() update nakardim, ba setCheck(!check) kar mikone ta update she, splice original ro change mikone behtare estefade nakonim.
			// checkbox.splice(checkboxTempIndex, 1)
			// setCheck(!check)		//state 'check' dar <AllTodo /> hast vali mishe dar Mainapp inja bashe, chon jaye dige estefade nakardim oonja gozashtim.
			/// setCheckBox([checkbox.splice(checkboxTempIndex, 1)])	//shayad beshe ama khoob nist.
			var chtemp = checkedTodo.toSpliced(checkboxTempIndex, 1)
			setCheckedTodo(chtemp)
			var chbox = checkbox.toSpliced(checkboxTempIndex, 1)
			setCheckBox(chbox)
			/* localStorage.setItem('checkedTodo', [JSON.stringify(checkedTodo)])
			localStorage.setItem('checkboxtick', [JSON.stringify(checkbox)]) */
			// checkbox.current = checkbox.current.splice(checkbox.current.indexOf(index), 1)
			// delete checkbox.current[1]
		}
	}

	const doing = () => {
		var todoTemp = todo.flatMap(v => v)
		for (var index in todoTemp) {
			for (var v of checkedTodo) {
				if (index == v.id) {
					// t.splice(1, 1)
					delete todoTemp[index]
					break
				}
			}
		}
		setDoingTodo(todoTemp)
		// localStorage.setItem('doingTodo', [JSON.stringify(todoTemp)])
		if (doneKey == true) setDoneKey(false)
		setDoingKey(true)
	}

	function donefiter() {
		// setTodo(todo.filter((value, index) => value == 'aa'))
		// setDoneKey(true)
		/* var x = ''
		for (let i in checkedTodo) {
			if (todo != [] && checkedTodo != []) {
				if (checkedTodo[i].val == todo[checkedTodo[i].id]) {
					setfiltered([checkedTodo[i].val])
				}
			}
		} */
		// checkedTodo.forEach((v) => x = v.val)
		// console.log(checkedTodo.flatMap((v) => v.val))
		// todo.filter((value, index) => checkedTodo.forEach((v) => {return x = v.val}))
		// setTodo(todo.flatMap((value, index) => if(value.val == ) checkedTodo.forEach((v) => {return x = v.val}))))	
	}

	function Todo() {
		// if (checkedTodo.current.length != 0 && doneKey == true) {
		if (doneKey == true) {return <Done checkedTodo={checkedTodo} remove={remove} />}
		else if (doingKey == true) {return <Doing doingTodo={doingTodo} />}
		else if (todo != null) {
			return <AllTodo todo={todo}
				checkbox={checkbox}
				checkedTodo={checkedTodo}
				remove={remove}
				done={done}
				edit={edit}
				editAccept={editAccept}
				editTodo={editTodo}
				editMode={editMode}
				edittext={edittext} />
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
										<TextField sx={{ width: '100%', pl: '5px' }} variant='outlined' size='small' placeholder='کار جدید اضافه کنید ...' value={inputvalue} onChange={(e) => { setInputvalue(e.target.value) }} />
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
										{/* <Button variant='outlined' onClick={() => donefilter()}>انجام شده</Button> */}
									</Grid>
								</Grid>
							</Grid>
							<List>{<Todo />}</List>
							{// <List>
								//	{todo.map((value, index) => <div key={index}>
								//		<ListItem sx={{ display: 'flex' }}>
								//			{(editTodo.current == index && editMode == true) ? <>
								//				<TextField variant='outlined' size='small' defaultValue={todo[index]} onChange={(e) => edittext.current = e.target.value} sx={{ width: '100%', marginLeft: '5px' }} />
								//				<IconButton sx={{ alignContent: 'end' }} color='info' onClick={() => { editAccept(index); setCheck(!check) }}><DoneIcon /></IconButton>
								//			</> : <>
								//				<Checkbox onClick={(e) => { done(value, index, e); /*setCheck(!check)*/	/*setCheck() baraye dobare update kardan va render kardane <Checkbox> hast, mitoone dar function done bashe. */ }} checked={Boolean(checkbox.find(v => v.id == index))} />
								//				{/* <p style={{ textDecoration: (checkedTodo.current.some((v) => { if (v.val == todo[index]) return true }) == true) ? 'line-through' : 'none' }}>{value}</p> */}
								//				<span style={{ textDecoration: (checkedTodo.some((v) => { if (v.id == index) return true }) == true) ? 'line-through' : 'none', textDecorationStyle: 'double', width: '100%', textAlign: 'start', padding: '0 0.5rem' }}>{value}</span>
								//				<IconButton sx={{ alignContent: 'end' }} color='success' onClick={() => { edit(index); setCheck(!check) }}><EditIcon /></IconButton>
								//				<IconButton sx={{ alignContent: 'end', transform: 'translateX(0)', transition: 'all 1s' }} color='error' onClick={() => { remove(index); setCheck(!check) }}><DeleteIcon /></IconButton>
								//			</>
								//			}
								//		</ListItem>
								//		<Divider />
								//	</div>
								//	)}
								//</List>
							}
							{/* <List>
								{checkedTodo.map((value, index) =>
									<div key={index}>
										<ListItem>
											<del style={{ textDecorationStyle: 'double', textAlign: 'start', width: '100%' }}>{value.val}</del>
											<IconButton color='error' onClick={() => remove(index)}><DeleteIcon /></IconButton>
										</ListItem>
										<Divider />
									</div>
								)}
							</List> */}
						</Card>
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Mainapp