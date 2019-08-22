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
        // However, some entities have IDs that should be integers, and others (li)
        entityId = parseInt(entityId) ? parseInt(entityId) : entityId

        // Call onChange event handler (passed in from parent)
        this.props.onChange(entityId);
    }

    convertEntitiesToDropdownItems(entities) {
        return entities.map(entity => {
            return <Dropdown.Item
                key={entity.id}
                eventKey={entity.id}
                onSelect={this.selectDropdownItem}>
                {entity[this.props.displayAttribute]}
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

            if(selectedEntity) {
                dropdownTitle = selectedEntity[this.props.displayAttribute];
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