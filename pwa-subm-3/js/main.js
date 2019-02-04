$(function() {
    $(document).ready(function() {    
        M.AutoInit();
    });

    $('.selectComp').change(function(){
        $(".matchCard").hide();
        var instance = M.FormSelect.getInstance(this);
        var value = instance.getSelectedValues();
        if (value.length>0) 
        {
            value.forEach(id => {
                $(".matchCard[compID='"+id+"']").show();
            });
        }
        else
        {
            $(".matchCard").hide();
        }
    });
  
});

