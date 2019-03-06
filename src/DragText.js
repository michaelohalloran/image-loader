import React, { Component } from "react";
import "./DragText.css";

export default class DragText extends Component {
	constructor() {
		super();
		this.state = {
			text: "",
			droppedText: ""
		};

		this.textRef = React.createRef();
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onDragStart = (e) => {
		console.log("dragStart evt target: ", e.target);
		console.log("dragStart innerHTML: ", e.target.innerHTML);
		console.log("dragStart textContent: ", e.target.textContent);
		console.log("dragStart dataTransfer: ", e.dataTransfer);
		let typedText = e.target.textContent;
		e.dataTransfer.setData("text", typedText);
	};

	onDragOver = (e) => {
		// console.log("dragOver evt: ", e);
		e.preventDefault();
	};

	onDrop = (e) => {
		console.log("drop evt: ", e);
		let typed = e.dataTransfer.getData("text");
		console.log("typed");
		this.setState({
			droppedText: typed
		});
	};

	render() {
		return (
			<div>
				<div className="drag-container">
					<img
						className="img-drop"
						id="data"
						alt="text"
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e)}
						src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG"
					/>

					<p className="dropped-text">{this.state.droppedText}</p>

					<br />

					<p
						draggable
						id="text"
						className="drag-text"
						ref={this.textRef}
						onDragStart={(e) => this.onDragStart(e)}
					>
						{this.state.text}
					</p>

					<input type="text" name="text" onChange={this.onChange} value={this.state.text} />
				</div>
			</div>
		);
	}
}
