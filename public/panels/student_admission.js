var schoolStudentInformationManager = [{
    title: 'Student List',
    region: 'west',
    collapsible: true,
    width: (window.innerWidth / 2) - 200,
    cmargins: '5 5 5 5',
    split: true,
    items: [{
        region: 'north',
        xtype: 'toolbar',
        items: [{ 
            xtype: 'textfield',
            emptyText:'Stdent code'
        }]
    }, Ext.create('Ext.grid.Panel', {
        id: 'studentList',
        columns: [
            {text: "Id", dataIndex: 'id', hidden:true},
            {text: "Student Name", dataIndex: 'student_name', width: 500 },
            {text: "Student Code", dataIndex: 'student_code', width: 400 },
            {text: "Class", dataIndex: 'class', width: 225 },
            {text: "Boarding", dataIndex: 'boarding', width: 225 },
        ]
    })]
},{
    xtype: 'tabpanel',
    region: 'center',
    items: [{
        xtype: 'tab',
        title: 'Student Information'
    },{
        xtype: 'tab',
        title: 'Admission Information'
    }]
}];