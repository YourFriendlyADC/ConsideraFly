setREVStartSize({c: 'rev_slider_2_1',rl:[1240,1240,1240,480],el:[900,900,900,720],gw:[1400,1400,1400,480],gh:[900,900,900,720],type:'standard',justify:'',layout:'fullwidth',mh:"0"});
                                    var	revapi2,
                                        tpj;
                                    jQuery(function() {
                                        tpj = jQuery;
                                        if(tpj("#rev_slider_2_1").revolution == undefined){
                                            revslider_showDoubleJqueryError("#rev_slider_2_1");
                                        }else{
                                            revapi2 = tpj("#rev_slider_2_1").show().revolution({
                                                jsFileLocation:"//aeromate.gov.co/wp-content/plugins/revslider/public/assets/js/",
                                                sliderLayout:"fullwidth",
                                                visibilityLevels:"1240,1240,1240,480",
                                                gridwidth:"1400,1400,1400,480",
                                                gridheight:"900,900,900,720",
                                                spinner:"spinner0",
                                                editorheight:"900,658,500,720",
                                                responsiveLevels:"1240,1240,1240,480",
                                                disableProgressBar:"on",
                                                navigation: {
                                                    onHoverStop:false
                                                },
                                                fallbacks: {
                                                    allowHTML5AutoPlayOnAndroid:true
                                                },
                                            });
                                        }
                                        
                                    });