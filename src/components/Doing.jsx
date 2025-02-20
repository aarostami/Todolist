import { Divider, IconButton, ListItem } from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export default function Doing({ doingTodo }) {
	return doingTodo.map((value, index) =>
		<div key={index}>
			{/* <ListItem><Checkbox onClick={(e) => { done(index, e) }} /><p style={{ textDecoration: (checkedTodo.current.some((v) => { if (v.val == todo[index]) return true }) == true) ? 'line-through' : 'none' }}>{value}</p></ListItem> */}
			<ListItem>
				<span style={{ width: '100%', textAlign: 'start' }}>{value}</span>
				<IconButton color='warning'><HourglassBottomIcon /></IconButton>
			</ListItem>
			<Divider />
		</div>
	)
}