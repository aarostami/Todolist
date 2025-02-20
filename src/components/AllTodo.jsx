import { Checkbox, Divider, IconButton, ListItem, TextField } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

export default function AllTodo({ todo, checkbox, checkedTodo, remove, done, edit, editAccept, editTodo, editMode, edittext }) {
	const [check, setCheck] = useState(false)

	// console.log(checkbox.current.some((v) => v.is == todo[0]))
	return todo.map((value, index) => <div key={index}>
		<ListItem sx={{ display: 'flex' }}>
			{(editTodo.current == index && editMode == true) ? <>
				<TextField variant='outlined' size='small' defaultValue={todo[index]} onChange={(e) => edittext.current = e.target.value} sx={{ width: '100%', marginLeft: '5px' }} />
				<IconButton sx={{ alignContent: 'end' }} color='info' onClick={() => { editAccept(index); /*setCheck(!check)*/ }}><DoneIcon /></IconButton>
			</> : <>
				<Checkbox onClick={(e) => { done(value, index, e); /*setCheck(!check)*/	/*setCheck() baraye dobare update kardan va render kardane <Checkbox> hast, mitoone dar function done bashe. */ }} checked={Boolean(checkbox.find(v => v.id == index))} />
				{/* <p style={{ textDecoration: (checkedTodo.current.some((v) => { if (v.val == todo[index]) return true }) == true) ? 'line-through' : 'none' }}>{value}</p> */}
				<span style={{ textDecoration: (checkedTodo.some((v) => { if (v.id == index) return true }) == true) ? 'line-through' : 'none', textDecorationStyle: 'double', width: '100%', textAlign: 'start', padding: '0 0.5rem' }}>{value}</span>
				<IconButton sx={{ alignContent: 'end' }} color='success' onClick={() => { edit(index); /*setCheck(!check)*/ }}><EditIcon /></IconButton>
				<IconButton sx={{ alignContent: 'end', transform: 'translateX(0)', transition: 'all 1s' }} color='error' onClick={() => { remove(index); /*setCheck(!check)*/ }}><DeleteIcon /></IconButton>
			</>
			}
		</ListItem>
		<Divider />
	</div>
	)
}