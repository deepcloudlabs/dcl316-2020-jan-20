class DashboardViewModel {
    constructor(){
        // domain related observables
        this.currencies= ko.observableArray([]);
        this.symbol= ko.observable("");
        this.isMonitoring= ko.observable(false);
        this.connected= ko.observable(false);
        this.windowSize = ko.observable(10);
        this.data = {
            labels: ko.observableArray([]),
            datasets: [
                {
                    label: [],
                    backgroundColor: "rgba(220,220,220,0.2)",
                    borderColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: ko.observableArray([])
                }
            ]
        } ;

        this.changeLng= this.changeLng.bind(this);
        this.i18n= this.i18n.bind(this);
        this.translate= this.translate.bind(this);
        this.start= this.start.bind(this);
        this.stop= this.stop.bind(this);
        this.retrieveCurrencies= this.retrieveCurrencies.bind(this);

        // connect to the websocket server
        this.socket = new SockJS("http://localhost:8001/market/api/v1/changes");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = () => {}
        this.stompClient.connect({},(frame)=>{
            toastr.success("Connected!");
            this.connected(true);
            this.stompClient.subscribe("/topic/changes",
                (msg)=>{
                    if(!this.isMonitoring()) return;
                    let trade = JSON.parse(msg.body);
                    this.data.datasets[0]
                             .data
                             .push(Number(trade.price));
                    let now = new Date().toTimeString();
                    now = now.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
                    this.data.labels.push(now);
                    if (this.data.datasets[0].data().length>this.windowSize()){
                        let sliceIndex = this.data.datasets[0].data().length-this.windowSize();
                        let slicedData = this.data.datasets[0].data.slice(sliceIndex);
                        this.data.datasets[0].data(slicedData);
                        let slicedLabels = this.data.labels.slice(sliceIndex);
                        this.data.labels(slicedLabels);
                    }
                })
        })
    }

    // i18n
    changeLng(lng){
        i18n.setLng(lng,() => {
            this.i18n();
        });
    };

    i18n(){
        $(document).i18n();
    };

    translate(word){
        return i18n.t(word);
    };

    retrieveCurrencies(){
        $.ajax({
            method: "GET",
            url: AppConfig.REST_API_BASE_URL.concat("/currencies"),
            cache: false,
            success: (currencies) => {
                 /* TODO : update the view model! */
                 toastr.success(i18n.t("messageCurrenciesRetrieved"), "", AppConfig.TOASTR_CONFIG);
            },
             error: ajaxErrorHandler
        });
    };

    // starts monitoring
    start(){
        this.isMonitoring(true);
        toastr.success(i18n.t("messageMonitoringStarted"), "", AppConfig.TOASTR_CONFIG);
    };

    // stops monitoring
    stop(){
        this.isMonitoring(false);
        toastr.warning(i18n.t("messageMonitoringStoped"), "", AppConfig.TOASTR_CONFIG);
    };

};

var dashBoardViewModel= new DashboardViewModel();

$( () => {
    i18n.init(AppConfig.I18N_CONFIG,(t) => {
        $(document).i18n();
        ko.applyBindings(dashBoardViewModel);
    });
});