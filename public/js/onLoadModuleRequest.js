function xLoadSchoolInformation()
{
    Ext.Msg.wait("Loading ...", "Please Wait ...");
    // Fire Ajax Request
    Ext.Ajax.timeout = 60000;
    Ext.Ajax.request({
       url: "/auth/web/loadSchoolInformation",
         
        success: function(response){
            Ext.MessageBox.hide();
            o = Ext.decode(response.responseText);
            if(o.rowCount == 0 || o.data == null)
            {
                Ext.Msg.alert('Message', "No Information Setup so far!");
            }

            if(response.status == 200)
            {
                // data -> 
                Ext.getCmp('cis_phonenumber').setValue(o.data.phone);
                Ext.getCmp('cis_schoolAddress').setValue(o.data.addresslocation);
                Ext.getCmp('cis_pobox').setValue(o.data.poBox);
                Ext.getCmp('cis_schoolEmail').setValue(o.data.email);
                Ext.getCmp('cis_schoolWebsite').setValue(o.data.schoolWebsite);
                Ext.getCmp('cis_schoolCity').setValue(o.data.city);
                Ext.getCmp('cis_schoolState').setValue(o.data.region);
                Ext.getCmp('cis_schoolCountry').setValue(o.data.country);
                Ext.getCmp('cis_schoolMotto').setValue(o.data.schoolmotto);
                Ext.getCmp('cis_studentprefix').setValue(o.data.studentprefix);
                Ext.getCmp('cLogo').setSrc('/storage/'+o.data.companyLogo);

            }
        },
        failure: function (response) {
            Ext.MessageBox.hide();
            if(response.status == 500)
            {
                Ext.Msg.alert('Failure', "Server error occured!");
            }
            Ext.Msg.alert('Failure', "Request processing failed. Please try again!");
        }
    });
}