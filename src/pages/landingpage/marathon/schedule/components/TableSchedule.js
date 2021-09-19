import React, {useState, useEffect} from "react"

import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";

import SweetAlert from "react-bootstrap-sweetalert";

const TableSchedule = (props) => {
  const [confirm, setConfirm] = useState(false);

  useEffect(async() => {
    console.log("props",props.list)
  }, []);

return (
      <React.Fragment>
        <Row>
                {/* <Col sm={6}>
                    <CardActivity/>
                </Col> */}
                <Col sm={12}>
                    <Card style={{maxHeight:"500px",overflow:"auto"}}>
                        <CardBody>
                                {props !=undefined && props.list? props.list.map((i) => (
                                    <div style={{marginBottom:"20px",borderRadius:"10px",border:"2px solid #0064ff"}} key={i.id}>
                                    <CardBody>
                                        <Row>
                                            <Col md={3} sm={12}>
                                                <div className="w-75 mx-auto">
                                                    <span>
                                                        <h5>{i.dayLabel}<br></br>{i.dateLabel}</h5>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={9} sm={12}>
                                                <div>
                                                <Table borderless={true} responsive="true">
                                                  <tr>
                                                    <td align="center" style={{paddingRight:"10px",paddingLeft:"10px"}}><h6>sesi</h6></td>
                                                    <td align="center" style={{paddingRight:"10px",paddingLeft:"10px"}}><h6>waktu</h6></td>
                                                    <td align="center" style={{paddingRight:"10px",paddingLeft:"10px"}}><h6>quota</h6></td>
                                                    <td align="center" style={{paddingRight:"10px",paddingLeft:"10px"}}><h6></h6></td>
                                                  </tr>
                                                  {i.session.map((s,k) => (
                                                    <tr key={s.id}>
                                                      <td align="center">{k+1}</td>
                                                      <td align="center">{s.startTime+" - "+s.endTime}</td>
                                                      <td align="center">{s.totalBooking+"/"+s.quota}</td>
                                                      <td align="center">
                                                        <div>
                                                        {confirm ? (
                                                                    <SweetAlert
                                                                        title="Apakah anda yakin?"
                                                                        warning
                                                                        showCancel
                                                                        confirmButtonText="Ya"
                                                                        cancelBtnText="Tidak"
                                                                        confirmBtnBsStyle="success"
                                                                        cancelBtnBsStyle="danger"
                                                                        onConfirm={() => {
                                                                        setConfirm(false);
                                                                        props.setSchedule({
                                                                          "participant_member_id":props?.member_id,
                                                                          "session_id":s.id,
                                                                          "date":i.date,
                                                                        });
                                                                        }}
                                                                        onCancel={() => setConfirm(false)}
                                                                        ></SweetAlert>
                                                                    ) : null}
                                                          <Button
                                                              disabled={props.myschedule && props.myschedule.length >= 3 ? true:false}
                                                              className="btn-success btn btn-secondary"
                                                              type="button"
                                                              onClick={() =>setConfirm(true)}
                                                              >
                                                              Pilih
                                                          </Button>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    </div>
                                    )):null}
                        </CardBody>
                    </Card>
                </Col>
               
            </Row>
      </React.Fragment>
     );
    };
    
    export default TableSchedule;