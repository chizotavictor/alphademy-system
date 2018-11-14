var branchSetup = [{

    defaults: {
        split: true
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [
        Ext.create('Ext.grid.Panel', {
            title: 'School Branch List',
            height: window.innerHeight - 250,
            store: schoolBranchStore,
            id: 'schoolBranchStoreID',
            columns: [
                {text: "Id", dataIndex: 'id', hidden:true},
                {text: "Branch Name", dataIndex: 'branchName', width: 500 },
                {text: "Branch Code", dataIndex: 'branchCode', width: 400 },
                {text: "Creation Date", dataIndex: 'created_at', width: 225 },
                {text: "Last Update", dataIndex: 'updated_at', width: 225 },
            ]
        }), Ext.create('Ext.form.Panel', {
            title: 'School Branch Setup',
            frame:false,
            bodyPadding: 10,
            defaultType: 'textfield',
            url: "#",

            items: [
                {
                    id: 'sbs_branch_id',
                    allowBlank: true,
                    name: 'branch_id',
                    hidden: true,

                },
                {
                    id: 'sbs_branch_name',
                    allowBlank: false,
                    fieldLabel: 'Branch Name',
                    name: 'branchName',
                    width: 1000,
                },
            ],
            buttons: [
                {
                    text:'New',
                    id: 'sbs_branch_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('sbs_branch_save').show(this);
                        Ext.getCmp('sbs_branch_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'sbs_branch_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();

                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/addNewSchoolBranch",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolBranchStore.reload();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'sbs_branch_update',
                    iconCls: 'save',
                    hidden:true,
                    handler:  function (action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/addNewSchoolBranch",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolBranchStore.reload();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }

                    }
                }
            ]
        }),
    ],
}];

Ext.getCmp('schoolBranchStoreID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if (selectedRecord.length) {
        Ext.getCmp('sbs_branch_id').setValue(selectedRecord[0].data.branchCode);
        Ext.getCmp('sbs_branch_name').setValue(selectedRecord[0].data.branchName);
        Ext.getCmp('sbs_branch_save').hide(this);
        Ext.getCmp('sbs_branch_update').show(this);
    }
});

var schoolSettings = [{
    xtype: 'tabpanel',
    items: [{
        title: 'School Information',
        iconCls: 'sub-settings',
        items: [{
            region: 'center',
            xtype: 'panel',

            items: [{
                defaults: {
                    split: true
                },

                items: [{

                    extend: "Ext.Panel",
                    layout: "border",
                    autoScroll: !1,
                    //height: 510,
                    height: window.innerHeight,
                    items: [{
                        title: 'School Information Setup',
                        region: 'west',
                        border: true,
                        margins: '0 0 0 0',
                        bodyPadding: '0 0 0 0',
                        width: 1000,
                        bodyStyle:'padding:10px;',
                        split: true,
                        items: Ext.create('Ext.form.Panel', {
                            frame: false,
                            bodyPadding: '10 10 0',
                            defaults: {
                                anchor: '100%',
                                allowBlank: false,
                                msgTarget: 'side',
                                labelWidth: 150,

                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'School Motto:',
                                    name:'schoolmotto',
                                    id:'cis_schoolMotto',
                                },
                             {
                                 xtype: 'textfield',
                                 fieldLabel: 'Phone number:',
                                 name:'phonenumber',
                                 id:'cis_phonenumber',
                             },{
                                 xtype: 'textarea',
                                 fieldLabel: 'Address:',
                                 name:'schoolAddress',
                                 id: 'cis_schoolAddress',
                             },
                              {
                                xtype: 'textfield',
                                fieldLabel: 'PO Box:',
                                name: 'pobox',
                                id: 'cis_pobox',
                             },{
                                xtype: 'textfield',
                                fieldLabel: 'Email:',
                                name: 'schoolEmail',
                                id: 'cis_schoolEmail',
                             },{
                                 xtype: 'textfield',
                                 fieldLabel: 'Website:',
                                 name: 'schoolWebsite',
                                 id: 'cis_schoolWebsite',
                             },{
                                 xtype: 'textfield',
                                 fieldLabel: 'City:',
                                 name: 'schoolCity',
                                 id: 'cis_schoolCity'
                             },{
                                 xtype: 'textfield',
                                 fieldLabel: 'State/Region:',
                                 name: 'schoolState',
                                 id: 'cis_schoolState',
                             },{
                                 xtype: 'combo',
                                 fieldLabel: 'Country:',
                                 name: 'schoolCountry',
                                 id: 'cis_schoolCountry',
                                 store: countries,
                                 queryMode: 'local',
                                 displayField: 'name',
                                 valueField: 'name'
                             },{
                                xtype: 'textfield',
                                fieldLabel: 'Student Prefix:',
                                name:'studentprefix',
                                id:'cis_studentprefix',
                            }
                            ],
                             buttons: [{
                                 text:'New',
                                 iconCls: 'drop-add',
                                 handler: function() {
                                     this.up('form').getForm().reset();
                                     //Ext.getCmp('cLogo').setSrc('http://www.sencha.com/img/20110215-feat-perf.png');
                                 }
                             },{
                                 text: 'Save',
                                 iconCls: 'save',
                                 handler: function() {
                                    var form = this.up('form').getForm();

                                    if(form.isValid()){
                                        Ext.Msg.wait("Loading ...", "Sending data ...");
                                        //Ext.Ajax.timeout = 60000;
                                        form.submit({
                                            url: "/auth/web/loadSchoolInformation",
                                            headers: {
                                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                                //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                            },
                                            method: 'POST',
                                            success: function(o, response){
                                                Ext.Msg.hide();
                                                console.log('sucessblock', response);
                                            },
                                            failure: function (o,response) {
                                                Ext.Msg.hide();
                                                if(response.response.status == 422)
                                                {
                                                    o = Ext.decode(response.response.responseText);
                                                    var jsonData = o.errors;
                                                    for(var obj in jsonData){
                                                        if(jsonData.hasOwnProperty(obj)){
                                                            for(var prop in jsonData[obj]){
                                                                if(jsonData[obj].hasOwnProperty(prop)){
                                                                    //alert(prop + ':' + jsonData[obj][prop]);
                                                                    Ext.Msg.minWidth = 400;
                                                                    Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }else if( response.response.status == 200){
                                                    o = Ext.decode(response.response.responseText);
                                                    Ext.Msg.alert('Message', o.message);
                                                }
                                            }
                                        });
                                    }
                                }
                             }]
                        })
                    }, {
                        title: "Setup School Logo",
                        region: 'center',
                        items: [Ext.create('Ext.Img', {
                            id: 'cLogo',
                            bodyPadding: 5,
                            margin: 60,
                            width: 100,
                            height: 100,
                            border:true,
                            //bodyStyle:'margin-left: 100px;',
                            src: "/img/photo-avatar.png",
                            //renderTo: Ext.getBody(),
                            listeners : {
                                load : {
                                    element : 'el',  //the rendered img element
                                    //fn : console.log
                                }
                            }
                        }),
                        Ext.create('Ext.form.Panel', {

                            // width: 500,
                            frame: false,
                            //title: 'Upload error test',
                            bodyPadding: '10 10 0',

                            defaults: {
                                anchor: '100%',
                                allowBlank: false,
                                msgTarget: 'side',
                                labelWidth: 100
                            },

                            items: [
                                {
                                    xtype: 'textfield',
                                    hidden: true,
                                    value: $('meta[name="csrf-token"]').attr('content'),
                                    name: '_token',
                                },
                            {
                                xtype: 'filefield',
                                id: 'schoolLogo',
                                emptyText: 'Select an image',
                                fieldLabel: 'School logo:',
                                name: 'schoolLogo',
                                //buttonText: '',
                                buttonConfig: {
                                    text:'Browse'
                                }
                            }],
                            buttons:[{
                                text: 'New',
                                iconCls: 'drop-add',
                            },{
                                text: 'Save',
                                iconCls: 'save',
                                // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest"
                                 handler: function() {
                                    var form = this.up('form').getForm();

                                     if(form.isValid()){
                                        Ext.Msg.wait("Loading ...", "Sending data ...");
                                        //Ext.Ajax.timeout = 60000;
                                        form.submit({
                                            url: "/auth/web/loadSchoolLogo",
                                            headers: {
                                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                                "Content-Type": "'multipart/form-data; charset=UTF-8'",
                                            },
                                            method: 'POST',
                                            success: function(o, response){
                                                Ext.Msg.hide();
                                                //console.log('sucessblock', response);
                                            },
                                            failure: function (o,response) {
                                                Ext.Msg.hide();
                                                var o = Ext.decode(response.response.responseText);
                                                if(o.status == true)
                                                {
                                                    //storage
                                                    Ext.getCmp('cLogo').setSrc('/storage/'+o.imgSrc);
                                                    Ext.Msg.alert('Message', o.reason);
                                                }else{
                                                    Ext.Msg.alert('Message', "Error occured while upoading logo.");
                                                }
                                                console.log('failureblock', o);
                                            }
                                        });
                                    }
                                }
                            }]
                        })
                    ]
                    }]
                }]

            }]
        }]
    }
    // ,{
    //     title: 'Institution Type',
    //     iconCls: 'sub-settings'
    // }
    ]
}];

var academicYearSetup = [{

    defaults: {
        split: true
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [
        Ext.create('Ext.grid.Panel', {
            height: window.innerHeight - 340,
            title: 'Academic Year',
            store: academicYearStore,
            id: 'academicYearStoreID',
            columns: [
                {text: "Id", dataIndex: 'id', hidden:true},
                {text: "Academic Session/Year", dataIndex: 'academicYear', width: 500 },
                {text: "Start Date", dataIndex: 'startDate', width: 250 },
                {text: "End Date", dataIndex: 'endDate', width: 250 },
                {text: "Status", dataIndex: 'status', width: 360 },
            ]
        }), Ext.create('Ext.form.Panel', {
            title: 'Academic Year Setup',
            region: 'south',
            bodyPadding: 10,
            defaultType: 'textfield',
            url: "#",

            items: [
                {
                    id: 'ays_id',
                    allowBlank: true,
                    name: 'ays_id',
                    hidden: true,

                },
                {
                    id: 'ays_year',
                    allowBlank: false,
                    fieldLabel: 'Academic Year',
                    name: 'ays_year',
                    width: 1000,
                    labelWidth:300
                },
                {
                    id: 'ays_start_date',
                    allowBlank: false,
                    fieldLabel: 'Start Date',
                    name: 'aysStartDate',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    editor: {
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        submitFormat: 'Y-m-d'
                    },
                    width: 1000,
                    labelWidth:300
                },{
                    id: 'ays_end_date',
                    allowBlank: false,
                    fieldLabel: 'End Date',
                    name: 'aysEndDate',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    editor: {
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        submitFormat: 'Y-m-d'
                    },
                    width: 1000,
                    labelWidth:300
                },{
                    id: 'ays_status',
                    allowBlank: false,
                    fieldLabel: 'Academic year status',
                    name: 'aysStatus',
                    width: 1000,
                    labelWidth:300,
                    xtype: 'combo',
                    store: acayearstatus,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name'
                },
            ],
            buttons: [
                {
                    text:'New',
                    id: 'ays_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('ays_save').show(this);
                        Ext.getCmp('ays_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'ays_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();

                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/addNewAcademicYea",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        academicYearStore.reload();

                                        form.reset();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'ays_update',
                    iconCls: 'save',
                    hidden:true,
                    handler:  function (action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/updateAcademicYear",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        academicYearStore.reload();

                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }

                    }
                }
            ]
        }),
    ],
}];

Ext.getCmp('academicYearStoreID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if (selectedRecord.length) {
        Ext.getCmp('ays_id').setValue(selectedRecord[0].data.id);
        Ext.getCmp('ays_year').setValue(selectedRecord[0].data.academicYear);
        Ext.getCmp('ays_start_date').setValue(selectedRecord[0].data.startDate);
        Ext.getCmp('ays_end_date').setValue(selectedRecord[0].data.endDate);
        Ext.getCmp('ays_status').setValue(selectedRecord[0].data.status);

        Ext.getCmp('ays_save').hide(this);
        Ext.getCmp('ays_update').show(this);
    }
});


var educationalSystem = [{

    defaults: {
        split: true
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [
        Ext.create('Ext.grid.Panel', {
            requires: [
                'Ext.grid.column.Action'
            ],
            height: window.innerHeight - 300,
            title: 'Educational System List',
            store: schoolEduSystemStore,
            id: 'educationalSystemStoreID',
            columns: [
                {text: "Id", dataIndex: 'id', hidden:true},
                {text: "branchCode", dataIndex: 'branchCode', hidden: true},
                {text: "School Branch", dataIndex: 'branchName', width: 500 },
                {text: "System Name", dataIndex: 'systemName', width: 350 },
                {text: "System Code", dataIndex: 'systemCode', width: 400 },
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    text: 'Delete',
                    align: 'center',
                    width: 100,
                    items: [{
                        iconCls: 'delete',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete:' + rec.get('systemName'), function(btn){
                                if(btn === 'yes'){
                                    Ext.Msg.wait("Loading ...", "Please Wait ...");
                                    Ext.Ajax.request({
                                        url: "/auth/web/deleteEducationSystem",
                                        method : "DELETE",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        params : {edu_sys_id:  rec.get('id'), _token: $('meta[name="csrf-token"]').attr('content') },
                                        jsonData: true,
                                        useDefaultXhrHeader : false,
                                        withCredentials: true,
                                        success : function(response) {
                                            // Ext.Msg.hide();
                                            var o = Ext.decode(response.responseText);
                                            schoolEduSystemStore.reload();
                                            Ext.Msg.alert('Message', o.message);
                                        },
                                        failure : function(response) {

                                            if(response.status == 422)
                                            {
                                                var o = Ext.decode(response.responseText);
                                                var jsonData = o.errors;
                                                for(var obj in jsonData){
                                                    if(jsonData.hasOwnProperty(obj)){
                                                        for(var prop in jsonData[obj]){
                                                            if(jsonData[obj].hasOwnProperty(prop)){
                                                                //alert(prop + ':' + jsonData[obj][prop]);
                                                                Ext.Msg.minWidth = 400;
                                                                Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }else if( response.status == 200){
                                                schoolEduSystemStore.reload();

                                                form.reset();
                                                o = Ext.decode(response.responseText);
                                                Ext.Msg.alert('Message', o.message);
                                            }
                                        }
                                    });
                                }
                                else{
                                //some code
                                }
                            });
                        }
                    }]
                }

            ]
        }), Ext.create('Ext.form.Panel', {
            title: 'Educational System Setup',
            region: 'south',
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            url: "/auth/web/addEducationSystem",

            items: [
                {
                    id: 'eds_id',
                    allowBlank: true,
                    name: 'eds_id',
                    hidden: true,

                },
                {
                    xtype: 'combo',
                    id: 'eds_branch',
                    allowBlank: false,
                    fieldLabel: 'Select school branch',
                    name: 'eds_branch_code',
                    width: 1000,
                    labelWidth:300,
                    store: loadComboxSchoolBranch,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'branchCode',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{branchName}  / {branchCode}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{branchName} / {branchCode}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            loadComboxSchoolBranch.reload();
                        }
                    }
                },
                {
                    id: 'eds_system_name',
                    allowBlank: false,
                    fieldLabel: 'Educational System Name',
                    name: 'eds_system_name',
                    width: 1000,
                    labelWidth:300
                }
            ],
            buttons: [
                {
                    text:'New',
                    id: 'eds_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('eds_save').show(this);
                        Ext.getCmp('eds_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'eds_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();

                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                //url: "/auth/web/addNewAcademicYea",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolEduSystemStore.reload();

                                        form.reset();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'eds_update',
                    iconCls: 'save',
                    hidden:true,
                    handler:  function (action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/updateEducationSystem",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolEduSystemStore.reload();

                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }

                    }
                }
            ]
        }),
    ],
}];

Ext.getCmp('educationalSystemStoreID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if (selectedRecord.length) {
        Ext.getCmp('eds_id').setValue(selectedRecord[0].data.id);
        Ext.getCmp('eds_branch').setValue(selectedRecord[0].data.branchCode);
        //Ext.getCmp('eds_system_name').setValue(selectedRecord[0].data.branchName);
        Ext.getCmp('eds_system_name').setValue(selectedRecord[0].data.systemName);
        //Ext.getCmp('ays_status').setValue(selectedRecord[0].data.systemCode);

        Ext.getCmp('eds_save').hide(this);
        Ext.getCmp('eds_update').show(this);
    }
});

var classProgramSetup =  [{

    defaults: {
        split: true
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [
        Ext.create('Ext.grid.Panel', {
            requires: [
                'Ext.grid.column.Action'
            ],
            height: window.innerHeight - 340,
            title: 'School Program List',
            store: schoolProgramStore,
            id: 'classProgramSetupID',
            columns: [
                {text: "Id", dataIndex: 'id', hidden:true},
                {dataIndex: "branch_code", hidden:true},
                {text: "Program", dataIndex: 'program_name',width: 300, hidden: false},
                {text: "Program Code", dataIndex: 'program_code', width: 300 },
                {text: "Education System Code", dataIndex: 'edu_system_code', width: 300 },
                {text: "School Branch", dataIndex: 'branch_name', width: 350 },
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    text: 'Delete',
                    align: 'center',
                    width: 100,
                    items: [{
                        iconCls: 'delete',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete program:' + rec.get('program_name'), function(btn){
                                if(btn === 'yes'){
                                    Ext.Msg.wait("Loading ...", "Please Wait ...");
                                    Ext.Ajax.request({
                                        url: "/auth/web/deleteSchoolProgram",
                                        method : "DELETE",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        params : {program_id:  rec.get('id'), _token: $('meta[name="csrf-token"]').attr('content') },
                                        jsonData: true,
                                        useDefaultXhrHeader : false,
                                        withCredentials: true,
                                        success : function(response) {
                                            // Ext.Msg.hide();
                                            var o = Ext.decode(response.responseText);
                                            schoolProgramStore.reload();
                                            Ext.Msg.alert('Message', o.message);
                                        },
                                        failure : function(response) {

                                            if(response.status == 422)
                                            {
                                                var o = Ext.decode(response.responseText);
                                                var jsonData = o.errors;
                                                for(var obj in jsonData){
                                                    if(jsonData.hasOwnProperty(obj)){
                                                        for(var prop in jsonData[obj]){
                                                            if(jsonData[obj].hasOwnProperty(prop)){
                                                                //alert(prop + ':' + jsonData[obj][prop]);
                                                                Ext.Msg.minWidth = 400;
                                                                Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }else if( response.status == 200){
                                                schoolProgramStore.reload();

                                                form.reset();
                                                o = Ext.decode(response.responseText);
                                                Ext.Msg.alert('Message', o.message);
                                            }
                                        }
                                    });
                                }
                                else{
                                //some code
                                }
                            });
                        }
                    }]
                }

            ]
        }),
        Ext.create('Ext.form.Panel', {
            title: 'Class/Program Setup',
            region: 'south',
            split: true,
            border: true,
            width: '100%',
            minWidth: 100,
            height: 200,
            minHeight: '140',
            bodyPadding: 10,
            stateful: true,
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            url: "/auth/web/addNewProgram",

            items: [
                {
                    id: 'cps_id',
                    allowBlank: true,
                    name: 'cps_id',
                    hidden: true,

                },
                {
                    xtype: 'combo',
                    id: 'cps_branch',
                    allowBlank: false,
                    fieldLabel: 'Select school branch',
                    name: 'cps_branch_code',
                    width: 1000,
                    labelWidth:300,
                    store: loadComboxSchoolBranch,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'branchCode',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{branchName}  / {branchCode}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{branchName} / {branchCode}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            loadComboxSchoolBranch.reload();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    id: 'cps_system',
                    allowBlank: false,
                    fieldLabel: 'Select education system',
                    name: 'cps_system_code',
                    width: 1000,
                    labelWidth:300,
                    store: loadComboxschoolEduSystem,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'systemCode',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{systemName}  / {systemCode} / {branchName}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{systemName} / {systemCode} / {branchName}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            loadComboxschoolEduSystem.reload();
                        }
                    }
                }, {
                    id: 'cps_program_name',
                    allowBlank: false,
                    name: 'cps_program_name',
                    fieldLabel: 'Program name',
                    labelWidth:300
                },
            ],
            buttons: [
                {
                    text:'New',
                    id: 'cps_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('cps_save').show(this);
                        Ext.getCmp('cps_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'cps_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();

                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                //url: "/auth/web/addNewAcademicYea",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolProgramStore.reload();

                                        form.reset();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'cps_update',
                    iconCls: 'save',
                    hidden:true,
                    handler:  function (action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/updateSchoolProgram",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolProgramStore.reload();

                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }

                    }
                }
            ]
        }),
    ],
}];

Ext.getCmp('classProgramSetupID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if (selectedRecord.length) {
        Ext.getCmp('cps_id').setValue(selectedRecord[0].data.id);
        Ext.getCmp('cps_program_name').setValue(selectedRecord[0].data.program_name);
        Ext.getCmp('cps_system').setValue(selectedRecord[0].data.edu_system_code);
        Ext.getCmp('cps_branch').setValue(selectedRecord[0].data.branch_code);
        //Ext.getCmp('ays_status').setValue(selectedRecord[0].data.systemCode);

        Ext.getCmp('cps_save').hide(this);
        Ext.getCmp('cps_update').show(this);
    }
});



var subjectProgramSetup = [{
    defaults: {
        //layout: 'border',
        split: true,
        padding: '0 0 0 0'
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [{
            region: 'north',
            collapsible: false,
            split: true,
            // minHeight: 250,
            items: [
                Ext.create('Ext.grid.Panel', {
                    requires: [
                        'Ext.grid.column.Action'
                    ],
                    height: 250,
                    tbar: [{
                        xtype: 'button',
                        text: 'Bulk Delete',
                        iconCls: 'delete'
                    },'-',{
                        xtype: 'textfield',
                        emptyText: 'Search subject code..',
                        width: 200
                    },{
                        xtype: 'button',
                        text: 'Search',
                        //iconCls: 'icon-load'
                    }],
                    store: loadComboxschoolClassSubject,
                    id: 'programSubjectSetupID',
                    selType: 'checkboxmodel',
                    height: window.innerHeight - 370,
                    columnLines: true,
                    columns: [
                        {text: "Id", dataIndex: 'id', hidden:true},
                        {dataIndex: "branch_code", hidden:true},
                        {text: "Subject Code", dataIndex: 'subject_code',width: 200, hidden: false},
                        {text: "Subject Name", dataIndex: 'subject_name', width: 350 },
                        {text: "Program Code", dataIndex: 'program_code', width: 200 },
                        {text: "Branch Code", dataIndex: 'branch_code', width: 250 },
                        {text: "Gradable", dataIndex: 'gradable', width: 230 },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            text: 'Delete',
                            align: 'center',
                            width: 100,
                            items: [{
                                iconCls: 'delete',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete subject:' + rec.get('subject_name'), function(btn){
                                        if(btn === 'yes'){
                                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                                            Ext.Ajax.request({
                                                url: "/auth/web/deleteSubject",
                                                method : "DELETE",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                                },
                                                params : {subject_id:  rec.get('id'), _token: $('meta[name="csrf-token"]').attr('content') },
                                                jsonData: true,
                                                useDefaultXhrHeader : false,
                                                withCredentials: true,
                                                success : function(response) {
                                                    // Ext.Msg.hide();
                                                    var o = Ext.decode(response.responseText);
                                                    loadComboxschoolClassSubject.reload();
                                                    Ext.Msg.alert('Message', o.message);
                                                },
                                                failure : function(response) {

                                                    if(response.status == 422)
                                                    {
                                                        var o = Ext.decode(response.responseText);
                                                        var jsonData = o.errors;
                                                        for(var obj in jsonData){
                                                            if(jsonData.hasOwnProperty(obj)){
                                                                for(var prop in jsonData[obj]){
                                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                                        Ext.Msg.minWidth = 400;
                                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }else if( response.status == 200){
                                                        loadComboxschoolClassSubject.reload();

                                                        form.reset();
                                                        o = Ext.decode(response.responseText);
                                                        Ext.Msg.alert('Message', o.message);
                                                    }
                                                }
                                            });
                                        }
                                        else{
                                        //some code
                                        }
                                    });
                                }
                            }]
                        }
                    ]
                })
            ]
        },
         Ext.create('Ext.form.Panel', {
            region: 'south',
            collapsible: false,
            // layout: 'absolute',
            title: 'Subject Setup',
            split: true,
            border: true,
            width: '100%',
            height: 250,
            minHeight: '140',
            bodyPadding: 10,
            stateful: true,
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            //url: "/auth/web/addNewProgram",

            items: [
                {
                    id: 'subps_id',
                    allowBlank: true,
                    name: 'subps_id',
                    hidden: true
                },
                {
                    xtype: 'combo',
                    id: 'subps_branch',
                    allowBlank: false,
                    fieldLabel: 'Select school branch',
                    name: 'subps_branch_code',
                    width: 1000,
                    labelWidth:300,
                    store: loadComboxSchoolBranch,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'branchCode',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{branchName}  / {branchCode}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{branchCode}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            loadComboxSchoolBranch.reload();
                        }
                    }
                },
                {
                    id: 'subps_subject_code',
                    allowBlank: false,
                    name: 'subps_subject_code',
                    fieldLabel: 'Subject Code',
                    labelWidth:300
                },
                {
                    id: 'subps_subject_name',
                    allowBlank: false,
                    name: 'subps_subject_name',
                    fieldLabel: 'Subject Name',
                    labelWidth:300
                },{
                    xtype: 'combo',
                    id: 'subps_gradable',
                    allowBlank: false,
                    fieldLabel: 'Gradable',
                    name: 'subps_gradable',
                    width: 1000,
                    store: polar,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    labelWidth:300,
                },{
                    xtype: 'combo',
                    id: 'subps_program_code',
                    allowBlank: false,
                    fieldLabel: 'Select Program',
                    name: 'subps_program_code',
                    width: 1000,
                    labelWidth:300,
                    store: schoolProgramStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'program_code',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{program_name}  / {program_code}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{program_code}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            schoolProgramStore.reload();
                        }
                    }
                }
            ],
            buttons: [
                {
                    text:'New',
                    id: 'subps_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('subps_save').show(this);
                        Ext.getCmp('subps_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'subps_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/addnewClassSubject",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        loadComboxschoolClassSubject.load();

                                        form.reset();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'subps_update',
                    iconCls: 'save',
                    hidden:true,
                    handler: function(action){
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/updateSchoolClassSubject",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        loadComboxschoolClassSubject.load();

                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                }
            ]
        })
    ]
}];

Ext.getCmp('programSubjectSetupID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if(selectedRecord.length) {
        Ext.getCmp('subps_id').setValue(selectedRecord[0].data.id);
        Ext.getCmp('subps_branch').setValue(selectedRecord[0].data.branch_code);
        Ext.getCmp('subps_subject_code').setValue(selectedRecord[0].data.subject_code);
        Ext.getCmp('subps_subject_name').setValue(selectedRecord[0].data.subject_name);
        Ext.getCmp('subps_gradable').setValue(selectedRecord[0].data.gradable);
        Ext.getCmp('subps_program_code').setValue(selectedRecord[0].data.program_code);

        Ext.getCmp('subps_save').hide(this);
        Ext.getCmp('subps_update').show(this);
    }

    if (selectedRecord.length > 1) {
        // console.log(selectedRecord);
    }
})
var schoolClassSetup = [{
    defaults: {
        //layout: 'border',
        split: true,
        padding: '0 0 0 0'
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [{
            region: 'north',
            collapsible: false,
            split: true,
            items: [
                Ext.create('Ext.grid.Panel', {
                    requires: [
                        'Ext.grid.column.Action'
                    ],
                    // title: 'School CLass List',
                    store: loadSchoolBranchClass,
                    width: window.innerWidth,
                    height: window.innerHeight - 330,
                    id: 'schoolClassSetupID',
                    // selType: 'checkboxmodel',
                    columns: [
                        {text: "Id", dataIndex: 'id', hidden:true},
                        {text: "Branch Code", dataIndex: "branch_code",width: 170, hidden:false},
                        {text: "Program", dataIndex: 'program_code', width: 300 },
                        {text: "Class", dataIndex: 'class', width: 400 },
                        {text: "Next Class", dataIndex: 'next_class', width: 400 },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            text: 'Delete',
                            align: 'center',
                            // width: 100,
                            items: [{
                                iconCls: 'delete',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete class:' + rec.get('class'), function(btn){
                                        if(btn === 'yes'){
                                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                                            Ext.Ajax.request({
                                                url: "/auth/web/deleteClass",
                                                method : "DELETE",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                                },
                                                params : {class_id:  rec.get('id'), _token: $('meta[name="csrf-token"]').attr('content') },
                                                jsonData: true,
                                                useDefaultXhrHeader : false,
                                                withCredentials: true,
                                                success : function(response) {
                                                    // Ext.Msg.hide();
                                                    var o = Ext.decode(response.responseText);
                                                    loadSchoolBranchClass.reload();
                                                    Ext.Msg.alert('Message', o.message);
                                                },
                                                failure : function(response) {

                                                    if(response.status == 422)
                                                    {
                                                        var o = Ext.decode(response.responseText);
                                                        var jsonData = o.errors;
                                                        for(var obj in jsonData){
                                                            if(jsonData.hasOwnProperty(obj)){
                                                                for(var prop in jsonData[obj]){
                                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                                        Ext.Msg.minWidth = 400;
                                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }else if( response.status == 200){
                                                        loadComboxschoolClassSubject.reload();

                                                        form.reset();
                                                        o = Ext.decode(response.responseText);
                                                        Ext.Msg.alert('Message', o.message);
                                                    }
                                                }
                                            });
                                        }
                                        else{
                                        //some code
                                        }
                                    });
                                }
                            }]
                        }
                    ]
                })
            ]
        },
         Ext.create('Ext.form.Panel', {
            region: 'south',
            collapsible: false,
            // layout: 'absolute',
            title: 'Class Setup',
            split: true,
            border: true,
            width: '100%',
            minWidth: 100,
            height: 200,
            minHeight: '140',
            bodyPadding: 10,
            stateful: true,
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    id: 'sclass_id',
                    allowBlank: true,
                    name: 'sclass_id',
                    hidden: true,
                },
                {
                    xtype: 'combo',
                    id: 'sclass_program_code',
                    allowBlank: false,
                    fieldLabel: 'School Program',
                    name: 'subps_program_code',
                    width: 1000,
                    labelWidth:300,
                    store: schoolProgramBranchStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'program_code',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{program_name}  / {program_code}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{program_code}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            schoolProgramBranchStore.load();
                        }
                    }
                },
                {
                    id: 'sclass_class',
                    allowBlank: false,
                    name: 'sclass_class',
                    fieldLabel: 'Class Name',
                    labelWidth:300
                },{
                    id: 'sclass_next_class',
                    allowBlank: false,
                    fieldLabel: 'Next Class',
                    name: 'sclass_next_class',
                    width: 1000,
                    labelWidth:300,
                }
            ],
            buttons: [
                {
                    text:'New',
                    id: 'sclass_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('sclass_save').show(this);
                        Ext.getCmp('sclass_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'sclass_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/addnewClass",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        loadSchoolBranchClass.load();

                                        form.reset();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'sclass_update',
                    iconCls: 'save',
                    hidden:true,
                    handler: function (action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/updateClass",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        loadSchoolBranchClass.load();

                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }

                    }
                }
            ]
        })
    ]
}];

Ext.getCmp('schoolClassSetupID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if(selectedRecord.length) {
        Ext.getCmp('sclass_id').setValue(selectedRecord[0].data.id);
        Ext.getCmp('sclass_class').setValue(selectedRecord[0].data.class);
        Ext.getCmp('sclass_next_class').setValue(selectedRecord[0].data.next_class);
        Ext.getCmp('sclass_program_code').setValue(selectedRecord[0].data.program_code);

        Ext.getCmp('sclass_save').hide(this);
        Ext.getCmp('sclass_update').show(this);
    }
});

var schoolClassGroupSetup = [{
    defaults: {
        split: true,
        padding: '0 0 0 0'
    },
    bodyPadding: '0 0 0 0',
    border: false,
    items: [{
            region: 'north',
            collapsible: false,
            split: true,
            width: window.innerWidth,
            height: window.innerHeight - 330,
            items: [
                Ext.create('Ext.grid.Panel', {
                    requires: [
                        'Ext.grid.column.Action'
                    ],
                    // title: 'School Group List',
                    store: schoolclassgroupStore,
                    id: 'schoolClassGroupSetupID',
                    columns: [
                        {text: "Id", dataIndex: 'id', hidden:true},
                        {dataIndex: "branch_code", hidden:true},
                        {text: "Program", dataIndex: 'program_code', width: 500 },
                        {text: "Class", dataIndex: 'class', width: 300 },
                        {text: "Class Group Name", dataIndex: 'class_group', width: 450 },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            text: 'Delete',
                            align: 'center',
                            // width: 100,
                            items: [{
                                iconCls: 'delete',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete class group:' + rec.get('class_group'), function(btn){
                                        if(btn === 'yes'){
                                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                                            Ext.Ajax.request({
                                                url: "/auth/web/deleteClassgroup",
                                                method : "DELETE",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                                },
                                                params : {class_group_id:  rec.get('id'), _token: $('meta[name="csrf-token"]').attr('content') },
                                                jsonData: true,
                                                useDefaultXhrHeader : false,
                                                withCredentials: true,
                                                success : function(response) {
                                                    // Ext.Msg.hide();
                                                    var o = Ext.decode(response.responseText);
                                                    schoolclassgroupStore.reload();
                                                    Ext.Msg.alert('Message', o.message);
                                                },
                                                failure : function(response) {

                                                    if(response.status == 422)
                                                    {
                                                        var o = Ext.decode(response.responseText);
                                                        var jsonData = o.errors;
                                                        for(var obj in jsonData){
                                                            if(jsonData.hasOwnProperty(obj)){
                                                                for(var prop in jsonData[obj]){
                                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                                        Ext.Msg.minWidth = 400;
                                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }else if( response.status == 200){
                                                        loadComboxschoolClassSubject.reload();

                                                        form.reset();
                                                        o = Ext.decode(response.responseText);
                                                        Ext.Msg.alert('Message', o.message);
                                                    }
                                                }
                                            });
                                        }
                                        else{
                                        //some code
                                        }
                                    });
                                }
                            }]
                        }
                    ]
                })
            ]
        },
         Ext.create('Ext.form.Panel', {
            region: 'south',
            collapsible: false,
            // layout: 'absolute',
            title: 'Class Group Setup',
            split: true,
            border: true,
            width: '100%',
            minWidth: 100,
            height: 200,
            minHeight: '140',
            bodyPadding: 10,
            stateful: true,
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    id: 'sgclass_id',
                    allowBlank: true,
                    name: 'subps_id',
                    hidden: true,
                },
                {
                    xtype: 'combo',
                    id: 'sgclass_program_code',
                    allowBlank: false,
                    fieldLabel: 'School Program',
                    name: 'sgclass_program_code',
                    width: 1000,
                    labelWidth:300,
                    store: schoolProgramBranchStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'program_code',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{program_name}  / {program_code}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{program_code}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            schoolProgramBranchStore.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    id: 'sgclass_class_name',
                    allowBlank: false,
                    name: 'sgclass_class_name',
                    fieldLabel: 'Class Name',
                    labelWidth:300,
                    store: loadSchoolBranchClass,
                    queryMode: 'local',
                    displayField: 'class',
                    valueField: 'class',
                    triggerAction: 'all',
                    mode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{class}</li>',
                        '</tpl></ul>'
                    ),
                    // template for the content inside text field
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{class}',
                        '</tpl>'
                    ),
                    listeners: {
                        focus:  function(e,f,g) {
                            loadSchoolBranchClass.load();
                        }
                    }
                },
                {
                    id: 'sgclass_class_group_name',
                    allowBlank: false,
                    name: 'sgclass_class_group_name',
                    fieldLabel: 'Class Group Name',
                    labelWidth:300
                }
            ],
            buttons: [
                {
                    text:'New',
                    id: 'sgclass_new',
                    iconCls: 'drop-add',
                    handler: function() {
                        this.up('form').getForm().reset();
                        Ext.getCmp('sgclass_save').show(this);
                        Ext.getCmp('sgclass_update').hide(this);
                    }
                }, {
                    text:'Save',
                    id: 'sgclass_save',
                    iconCls: 'save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function(action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/addClassGroup",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                },
                                method: 'POST',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolclassgroupStore.load();

                                        form.reset();
                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }
                    }
                },{
                    text:'Update',
                    id: 'sgclass_update',
                    iconCls: 'save',
                    hidden:true,
                    handler: function (action) {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            Ext.Msg.wait("Loading ...", "Please Wait ...");
                            form.submit({
                                url: "/auth/web/updateClassGroup",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                    //"Content-Type": "'multipart/form-data; charset=UTF-8'",
                                },
                                method: 'PUT',
                                success: function(o, response){
                                    Ext.Msg.hide();
                                    console.log('sucessblock', response);
                                },
                                failure: function (o,response) {
                                    Ext.Msg.hide();
                                    if(response.response.status == 422)
                                    {
                                        o = Ext.decode(response.response.responseText);
                                        var jsonData = o.errors;
                                        for(var obj in jsonData){
                                            if(jsonData.hasOwnProperty(obj)){
                                                for(var prop in jsonData[obj]){
                                                    if(jsonData[obj].hasOwnProperty(prop)){
                                                        //alert(prop + ':' + jsonData[obj][prop]);
                                                        Ext.Msg.minWidth = 400;
                                                        Ext.Msg.alert('Error',jsonData[obj][prop]);
                                                    }
                                                }
                                            }
                                        }
                                    }else if( response.response.status == 200){
                                        schoolclassgroupStore.load();

                                        o = Ext.decode(response.response.responseText);
                                        Ext.Msg.alert('Message', o.message);
                                    }
                                }
                            });
                        }else{
                            Ext.Msg.alert('Error', "Form values invalid.");
                        }

                    }
                }
            ]
        })
    ]
}];

Ext.getCmp('schoolClassGroupSetupID').getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
    if(selectedRecord.length) {
        Ext.getCmp('sgclass_id').setValue(selectedRecord[0].data.id);
        Ext.getCmp('sgclass_class_name').setValue(selectedRecord[0].data.class);
        Ext.getCmp('sgclass_class_group_name').setValue(selectedRecord[0].data.class_group);
        Ext.getCmp('sgclass_program_code').setValue(selectedRecord[0].data.program_code);

        Ext.getCmp('sgclass_save').hide(this);
        Ext.getCmp('sgclass_update').show(this);
    }
});