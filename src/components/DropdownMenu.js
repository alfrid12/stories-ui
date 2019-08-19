import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


export default class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEntity: {}
        };

        this.selectDropdownItem = this.selectDropdownItem.bind(this);
        this.getEntityById = this.getEntityById.bind(this);
    }

    selectDropdownItem(entityId){
        // entityId comes back as a string from the HTML
        const entityIdAsNumber = parseInt(entityId);

        // Call onChange event handler (passed in from parent)
        this.props.onChange(entityIdAsNumber);
    }

    convertEntitiesToDropdownItems(entities) {
        return entities.map(entity => {
            return <Dropdown.Item
                key={entity.id}
                eventKey={entity.id}
                onSelect={this.selectDropdownItem}>
                {entity.name ? entity.name : entity.title}
            </Dropdown.Item>;
        });
    }

    getEntityById(entityId) {
        return this.props.entities.filter(entity => entity.id === entityId)[0];
    }

    render(){

        const dropdownItems = this.convertEntitiesToDropdownItems(this.props.entities);

        // Determine value that will be displayed in dropdown box
        let dropdownTitle;

        if(this.props.selectedEntityId) {
            const selectedEntity = this.getEntityById(this.props.selectedEntityId);

            if(selectedEntity){
                // If the currently selected entity has a name attribute, use that as the dropdown title
                if (selectedEntity.name) dropdownTitle = selectedEntity.name;

                // If the currently selected entity has a title attribute, use that as the dropdown title
                else if (selectedEntity.title) dropdownTitle = selectedEntity.title;

                // If no suitable dropdown title was found, default to the placeholder prop
                else dropdownTitle = this.props.placeholder;
            }

            // If no suitable dropdown title was found, default to the placeholder prop
            else dropdownTitle = this.props.placeholder;
        }  

        // If no suitable dropdown title was found, default to the placeholder prop
        else dropdownTitle = this.props.placeholder;

        return (
            <div>
                <Form.Label>{this.props.label}</Form.Label>
                <DropdownButton variant="secondary" title={dropdownTitle} disabled={this.props.disabled}>
                    {dropdownItems}
                </DropdownButton>
            </div>
        );
    }
}