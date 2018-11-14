var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',

ImageModel = Ext.define('ImageModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name'},
        {name: 'image'},
        {name: 'systemCode'},
        {name:'id'}
    ]
});

var system_mod_store = Ext.create('Ext.data.Store', {
    model: 'ImageModel',
    proxy: {
        type: 'ajax',
        url: '/auth/web/loadUserAssignedModules',
        reader: {
            type: 'json',
            root: 'menus'
        }
    }
});

var subModules =  [
    'STDADMSN-STDINFO', // => 0
    'STDADMSN-LDNWSTD',  // => 1
    'STDADMSN-ADMSNRPT',  // => 2
    'STDADMSN-ADMSTAMGR',  // => 3
    'STDADMSN-ADMSMSETGS',  // => 4
    'SETCONF-SCHLSET',  // => 5
    'SETCONF-BRACHSET',  // => 6
    'SETCONF-ACAYRSET', // => 7
    'SETCONF-EDUSYS', // => 8
    'SETCONF-CLSPRMSET', // => 9
    'SETCONF-SUBCONF', // => 10
    'SETCONF-CLASSSET', // => 11
    'SETCONF-CLASSGRP', // => 12
];



function checkforSubmodule(systemCode){
    var flag = false;
    for (let index = 0; index < subModules.length; index++) {
        if(systemCode == subModules[index]){
            flag = true;
        }
    }
    return flag;
}

function loadSub(systemCode, systemName){
    if (systemCode == "BACKWARD") {
        localStorage.setItem('selectedModule', "");
        system_mod_store.proxy.extraParams = { module: "" };
        system_mod_store.load();
    }else{

        if(checkforSubmodule(systemCode)){
            addTab(systemName, systemCode);
        }else{
            system_mod_store.proxy.extraParams = { module: systemCode + "" };
            system_mod_store.load();
        }
    }
}


var menuItemsTabs = Ext.widget('tabpanel', {
    resizeTabs: true,
    activeTab: 0,
    enableTabScroll: true,
    items:[{
        title: 'Management Console',
        iconCls: 'tabs',
        id: 'welcomeTab',
        //closable: true,
        items: Ext.create('Ext.view.View', {
            store: system_mod_store,
            autoScroll: true,
            scrollable: 'vertical',
            //renderTo: 'dataview-example',
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name:stripTags}"  style="margin-left:10px;margin-top:10px;float:left">',
                        '<div class="thumb"><img src="/img/{image}"  style="width:160px; height:150px" title="{name:htmlEncode}"></div>',
                        '<center><span class="x-editable" style="font-weight:bold;font-family: cursive; text-align:center;">{name:htmlEncode}</span></center>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            // multiSelect: true,
            height: 500,
            // trackOver: true,
            viewConfig: {
                emptyText: 'No records to show'
            },
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText:  "<p class='font-weight:bold'>Please try to contact our support team.</p>",

            listeners: {
                itemclick: function(e,f) {
                    loadSub(f.raw.systemCode, f.raw.name);
                },
                selectionchange: function(dv, nodes ){
                    var l = nodes.length,
                        s = l !== 1 ? 's' : '';
                    //this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                    //addTab(true);
                }
            }
        })
    }],
    plugins: Ext.create('Ext.ux.TabCloseMenu', {})
    // plugins: Ext.create('Ext.ux.TabCloseMenu', {
    //     extraItemsTail: [
    //         '-',
    //         {
    //             text: 'Closable',
    //             checked: true,
    //             hideOnClick: true,
    //             handler: function (item) {
    //                currentItem.tab.setClosable(item.checked);
    //             }
    //         },
    //         '-',
    //         {
    //             text: 'Enabled',
    //             checked: true,
    //             hideOnClick: true,
    //             handler: function(item) {
    //                 currentItem.tab.setDisabled(!item.checked);
    //             }
    //         }
    //     ],
    //     listeners: {
    //         beforemenu: function (menu, item) {
    //             var enabled = menu.child('[text="Enabled"]');
    //             menu.child('[text="Closable"]').setChecked(item.closable);
    //             if (item.tab.active) {
    //                 enabled.disable();
    //             } else {
    //                 enabled.enable();
    //                 enabled.setChecked(!item.tab.isDisabled());
    //             }

    //             currentItem = item;
    //         }
    //     }
    // })
});

var currentItem;


// tab generation code
var index = 0;

// while(index < 3) {
//     //addTab(index % 2);
// }

function doScroll(item) {
    var id = item.id.replace('_menu', ''),
        tab = menuItemsTabs.getComponent(id).tab;

    menuItemsTabs.getTabBar().layout.overflowHandler.scrollToItem(tab);
}

function addTab(name, systemCode) {

    // FILTER THROUGHT ARRAY OBJECT AND PUSH ALL THE SYSTEMCODE |ID INTO A NEW ARRAY CONTAINER
    o = menuItemsTabs.items.keys;
    var container = [];

    for(var i=0; i<=o.length; i++)
    {
        container[i] = o[i];
    }

    if(container.includes(systemCode))
    {

        var tabID = Ext.getCmp(systemCode);
        menuItemsTabs.child(tabID).tab.show();
        menuItemsTabs.setActiveTab(tabID);

        // For loadable Tabs
        switch (systemCode) {
            case subModules[5]:
                xLoadSchoolInformation();
                break;
            case subModules[6]:
                schoolBranchStore.reload();
                break;
            case subModules[7]:
                academicYearStore.reload();
                break;
            case subModules[8]:
                schoolEduSystemStore.reload();
                break;
            case subModules[9]:
                schoolProgramStore.reload();
                break;
            case subModules[10]:
                loadComboxschoolClassSubject.reload();
                break;
            case subModules[11]:
                loadSchoolBranchClass.reload();
                break;
            case subModules[12]:
                schoolclassgroupStore.reload();
                break;
            default:
                break;
        }
    }else{
        if(pullMenu(name, systemCode) == null)
        {
            alert('Menu not set' + systemCode);
        }else{
            menuItemsTabs.add(pullMenu(name, systemCode)).show();
        }
        //console.log(o);
    }
}

function pullMenu(name, systemCode) {
    /**
    * Please try to register to newly added module here
    * before loading on browser
    */
    // var tabArr = [];

    ++index;
    menuObject = null;

    switch (systemCode) {
        case subModules[6]:
            obj =  { closable:false,name:systemCode, iconCls: 'settings-icon', title: name, id: systemCode, itemId: systemCode, items:branchSetup };
            menuObject = obj;
            schoolBranchStore.load();
            break;
        case subModules[5]:
            obj =  { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode,itemId: systemCode, items: schoolSettings };
            menuObject = obj;
            xLoadSchoolInformation();
            break;
        case subModules[7]:
            obj =  { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode,itemId: systemCode, items: academicYearSetup };
            menuObject = obj;
            academicYearStore.load();
            break;
        case subModules[8]:
            obj =  { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode,itemId: systemCode, items: educationalSystem };
            menuObject = obj;
            schoolEduSystemStore.load();
            break;
        case subModules[9]:
            obj =  { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode,itemId: systemCode, items: classProgramSetup };
            menuObject = obj;
            schoolProgramStore.load();
            break;
        case subModules[10]:
            obj = { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode, itemId: systemCode, items: subjectProgramSetup };
            menuObject = obj;
            loadComboxschoolClassSubject.load();
            break;
        case subModules[11]:
            obj = { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode, itemId: systemCode, items: schoolClassSetup };
            menuObject = obj;
            loadSchoolBranchClass.load();
            break;
        case subModules[12]:
            obj = { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode, itemId: systemCode, items: schoolClassGroupSetup };
            menuObject = obj;
            schoolclassgroupStore.load();
            break;
        case subModules[0]:
            obj = { closable:false, name: systemCode, iconCls: 'settings-icon', title: name, id: systemCode, itemId: systemCode, layout: 'border', xtype:'panel', items: schoolStudentInformationManager };
            menuObject = obj;
            break;
        default:
            break;
    }

    return menuObject;
}

function HideAction(item) {
    var id = item.id.replace('_menu', '');

    if(id === "welcomeTab")
    {
        menuItemsTabs.setActiveTab('welcomeTab');
    }else{
        menuItemsTabs.child('#'+id).tab.hide();
        menuItemsTabs.setActiveTab('welcomeTab');
    }
}

function removeFromMenu(ct, tab) {
    var id = tab.id + '_menu';
    menu_hide.remove(id);
}

function addToMenu(ct, tab) {

    menu_hide.add({
        text: tab.title,
        id: tab.id + '_menu',
        handler: HideAction
    });
}

menuItemsTabs.on({
    add: addToMenu,
    remove: removeFromMenu
});

var menu = new Ext.menu.Menu();
    var menu_hide = new Ext.menu.Menu();
    menuItemsTabs.items.each(function(tab){
        addToMenu(menuItemsTabs, tab);
        //addMenu(tabs, tab);
    });

system_mod_store.load();
