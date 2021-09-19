import React, {useState, useEffect} from "react"
import MetaTags from 'react-meta-tags';
import Footer from "layouts/landingpage/Footer";
import HeaderForm from "layouts/landingpage/HeaderForm";
import { Container, Row, Col,  Card, Media, CardBody, Button} from "reactstrap";
import styled from 'styled-components';
import TableSchedule from "./components/TableSchedule";
import CardInfo from "./components/CardInfo";
import { ScheduleMemberService } from "services";
import { useParams } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";


const Label = styled.label`
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  color: #495057;
  display: ruby;
  font-style: italic;
`;

const ScheduleMarathon = () => {
    const [list, setList] = useState([]);
    const [mySchedule, setMySchedule] = useState([]);
    const [participant, setParticipant] = useState({});
    const [payload, setPayload] = useState({});
    const { member_id } = useParams();
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getSchedule()
      }, []);
    
    const getSchedule = async() =>{
        const { data, errors, message, success } = await ScheduleMemberService.get({
            "participant_member_id":member_id,
        });
        if (success) {
          if (data) {
                setList(data.schedules)
                setMySchedule(data.mySchedule)
                setParticipant(data.participant)
          }
        } else {
            error
            setError(message);
            console.error(message, errors);
        }
    } 

    const setSchedule = async (schedule) => {
        const { success } = await ScheduleMemberService.set(schedule);
        if (success) {
            getSchedule()
        }
      };
    
    const unsetSchedule = async (schedule) => {
        setError("");
        const { message, success } = await ScheduleMemberService.unset(schedule);
        if (success) {
            getSchedule()
        }else{
            setError(message);
            console.log("success",message)
        }
      };
  return (
    <React.Fragment>
      <MetaTags>
        <title>Marathon | MyAchery</title>
      </MetaTags>
      {/* import navbar */}
      <HeaderForm />
 
        <Container fluid className="px-5 p-2">
            <Row>
                <CardInfo info={participant}/>
                <Card>
                    <CardBody>
                        <Media>
                            <Media body>
                                    <Label>Kualifikasi dapat dilakukan sesuai dengan jadwal yang ditentukan peserta, Anda dapat memilih maksimal 3 sesi pengambilan nilai kualifikasi.</Label>
                                <div className="d-flex mt-3">
                                    <Col sm={8}>
                                        <TableSchedule setSchedule={setSchedule} list={list} member_id={member_id} myschedule={mySchedule}/>
                                    </Col>

                                    <Col sm={4}>

                                        <Card style={{backgroundColor: "#FAFAFA"}}>
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <label>Kategori Lomba terdaftar</label>
                                                        <p>{participant.categoryLabel}</p>
                                                    </Media>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                        <Card style={{backgroundColor: "#FAFAFA"}}>
                                            <CardBody>
                                                <Media>
                                                    <Media body>
                                                        <div>
                                                            <label>Jadwal Anda</label>
                                                        </div>

                                                        <div>
                                                          {mySchedule.length < 1 ? <div><br></br><p style={{textAlign:"center"}}>belum ada jadwal yang dipilih</p></div> : mySchedule.map((s,k) => (
                                                            <tr key={k}>
                                                                <td>*</td>
                                                                <td>
                                                                    <p>{s.dayLabel} {s.dateLabel} - Sesi {k+1} ({s.session.startTime}-{s.session.endTime})</p>
                                                                </td>
                                                                <td>
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
                                                                        unsetSchedule(payload);
                                                                        }}
                                                                        onCancel={() => setConfirm(false)}
                                                                        ></SweetAlert>
                                                                    ) : null}
                                                                    <Button
                                                                        className="btn-danger btn btn-secondary"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setConfirm(true);setPayload({
                                                                                "schedule_id": s.myScheduleId
                                                                            })
                                                                          }}
                                                                        >
                                                                        batalkan
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                          ))}
                                                          <p style={{color:"red"}}>{error}</p>
                                                        </div>
                                                    </Media>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </div>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Row>
        </Container>

      <Footer />

    </React.Fragment>
  )
}

export default ScheduleMarathon
