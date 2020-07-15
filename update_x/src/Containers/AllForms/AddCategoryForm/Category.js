import React from "react";
import Form from "../../UI/Form/Form";

const formEntries = {
	name: {
		elementType: "input",
		elementConfig: {
			type: "text",
			value: "",
			placeholder: "Category",
			name: "category",
		},
		validation: {
			required: true,
			minLength: 2,
		},
		valid: false,
		isTouched: false,
	},

	image: {
		elementType: "input",
		elementConfig: {
			type: "file",
			value: "",
			placeholder: "",
			name: "image",
		},
		validation: {
			required: false,
		},
		valid: true,
		isTouched: false,
	},
};

const Category = (props) => {
	return (
		<div>
			<Form formEntries={formEntries} />
		</div>
	);
};

export default Category;
