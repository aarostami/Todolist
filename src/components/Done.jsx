import { Divider, IconButton, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Done({ checkedTodo, remove }) {
	// ba filter() nemishe chon dar todo id nadarim va ba value ham baraye mosavi kardane checkedTodo foreach ya ... tak value return nemikone.
	return checkedTodo.map((value, index) =>
		<div key={index}>
			<ListItem>
				<del style={{ textDecorationStyle: 'double', textAlign: 'start', width: '100%' }}>{value.val}</del>
				<IconButton color='error' onClick={() => remove(index)}><DeleteIcon /></IconButton>
			</ListItem>
			<Divider />
		</div>
	)
}