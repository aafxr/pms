import clsx from "clsx";
import React, {useState, ChangeEvent} from 'react';
import {Button, Input, Modal, Select, Wrapper} from "../../components";
import {Company, UR_Company} from "../../core/classes/Company";
import {Accordion} from "../../components/Accordion";

import './CompanyCreateModal.scss'


export type ModalStateType = {
    companyName: string
    directorFIO: string
    directorPhone: string
    country: string
    logo: Blob | undefined
    company: UR_Company
    ur_address: string
    fiz_address: string
    ogrn_date_text: string
    company_date_text: string
}

const defaultState: ModalStateType = {
    companyName: '',
    directorFIO: '',
    directorPhone: '',
    country: '',
    company: new UR_Company(),
    logo: undefined,
    ur_address: '',
    fiz_address: '',
    ogrn_date_text: '',
    company_date_text: ''
}

export interface CompanyCreateModal {
    open?: boolean
    className?: string
    onCreate?: (company: ModalStateType) => unknown
    onCancel?: () => unknown
    onClose?: () => unknown
}

export function CompanyCreateModal({
                                       open,
                                       className,
                                       onCreate,
                                       onClose,
                                       onCancel
                                   }: CompanyCreateModal) {
    const [state, setState] = useState(defaultState)
    const [requisitesOpen, setRequisitesOpen] = useState(true)


    function handleCompanyNameChange(e: ChangeEvent<HTMLInputElement>) {
        const companyName = e.target.value.trim()
        setState({...state, companyName})
    }


    function handleDirectorFIOChange(e: ChangeEvent<HTMLInputElement>) {
        const directorFIO = e.target.value.trim()
        setState({...state, directorFIO})
    }


    function handleDirectorPhoneChange(e: ChangeEvent<HTMLInputElement>) {
        const directorPhone = e.target.value.trim()
        setState({...state, directorPhone})
    }


    function handleCountryChange(e: ChangeEvent<HTMLInputElement>) {
        const country = e.target.value.trim()
        setState({...state, country})
    }


    function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
        const logo = e.target.files?.[0];
        setState({...state, logo})
    }


    function handleINNChange(e: ChangeEvent<HTMLInputElement>) {
        const INN = +e.target.value.trim()
        setState({...state, company: new UR_Company({...state.company, INN})})
    }


    function handleKPPChange(e: ChangeEvent<HTMLInputElement>) {
        const KPP = +e.target.value.trim()
        setState({...state, company: new UR_Company({...state.company, KPP})})
    }


    function handleOGRNChange(e: ChangeEvent<HTMLInputElement>) {
        const OGRN = +e.target.value.trim()
        setState({...state, company: new UR_Company({...state.company, OGRN})})
    }


    function handleOGRNDateChange(e: ChangeEvent<HTMLInputElement>) {
        const OGRN_date = e.target.value.trim()
        const newState = {...state, company: new UR_Company({...state.company})}
        newState.ogrn_date_text = OGRN_date

        if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/.test(OGRN_date)) {
            const [d, m, y] = OGRN_date.split(/[\/\-\.]/)
            newState.company.OGRN_date = new Date(+y, +m, +d)
        }

        setState(newState)
    }


    function handleCompanyDateChange(e: ChangeEvent<HTMLInputElement>) {
        const created_at = e.target.value.trim()
        const newState = {...state, company: new UR_Company({...state.company})}
        newState.company_date_text = created_at

        if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/.test(created_at)) {
            const [d, m, y] = created_at.split(/[\/\-\.]/)
            newState.company.created_at = new Date(+y, +m, +d)
        }

        setState(newState)
    }


    function handleUR_AddressChange(e: ChangeEvent<HTMLInputElement>) {
        const ur_address = e.target.value.trim()
        const newState = {...state, company: new UR_Company({...state.company})}
        newState.company.ur_address = ur_address
        setState(newState)
    }


    function handleFiz_AddressChange(e: ChangeEvent<HTMLInputElement>) {
        const fizics_address = e.target.value.trim()
        const newState = {...state, company: new UR_Company({...state.company})}
        newState.company.fizics_address = fizics_address
        setState(newState)
    }


    function handleBIKChange(e: ChangeEvent<HTMLInputElement>) {
        const BIK = e.target.value.trim()
        const newState = {...state, company: new UR_Company({...state.company})}
        newState.company.BIK = BIK
        setState(newState)
    }


    function handleInvoiceChange(e: ChangeEvent<HTMLInputElement>) {
        const invoiceNumber = +e.target.value.trim()
        setState({...state, company: new UR_Company({...state.company, invoiceNumber})})
    }


    function handleCorpInvoiceChange(e: ChangeEvent<HTMLInputElement>) {
        const correspondentInvoiceNumber = +e.target.value.trim()
        setState({...state, company: new UR_Company({...state.company, correspondentInvoiceNumber})})
    }


    function handleBankNameChange(e: ChangeEvent<HTMLInputElement>) {
        const bankName = e.target.value.trim()
        const newState = {...state, company: new UR_Company({...state.company})}
        newState.company.bankName = bankName
        setState(newState)
    }


    function handleCreateButtonClick() {
        onCreate?.(state)
    }


    return (
        <Modal open={open} className={clsx('companyCreate', className)} onClose={onClose}>
            <Wrapper>
                <Wrapper.Content>
                    <div className='companyCreate-inner'>
                        <h2 className='companyCreate-title title'>Создание компании</h2>
                        <div className='companyCreate-name'>
                            <div className='companyCreate-label label'>Название компании</div>
                            <Input className={'companyCreate-input'} value={state.companyName}
                                   onChange={handleCompanyNameChange} placeholder={'Название компании'}/>
                        </div>

                        <div className='companyCreate-director'>
                            <div className='companyCreate-director-fio'>
                                <div className='companyCreate-label label'>ФИО руководителя</div>
                                <Input className={'companyCreate-input'} value={state.directorFIO}
                                       onChange={handleDirectorFIOChange} placeholder={'ФИО руководителя'}/>
                            </div>

                            <div className='companyCreate-directore-phone'>
                                <div className='companyCreate-label label'>Телефон</div>
                                <Input
                                    type='tel'
                                    className={'companyCreate-input'}
                                    value={state.directorPhone}
                                    onChange={handleDirectorPhoneChange}
                                    placeholder={'Телефон'}
                                    inputMode={'tel'}
                                />
                            </div>
                        </div>

                        <div className='companyCreate-country'>
                            <div className='companyCreate-label label'>Страна</div>
                            <Input type="file" className={'companyCreate-input'} value={state.country}
                                   onChange={handleCountryChange} placeholder={'Страна'}/>
                        </div>

                        <div className='companyCreate-logo'>
                            <div className='companyCreate-label label'>Вложения</div>
                            <Input className={'companyCreate-input'}
                                   onChange={handleLogoChange} placeholder={'Вложения'}/>
                        </div>

                        <Accordion className='companyCreate-requizites' title={'Реквизиты компании'}
                                   open={requisitesOpen}
                                   onOpenChanged={() => setRequisitesOpen(!requisitesOpen)}>
                            <div className='companyCreate-requizites-content'>

                                <div className='companyCreate-inn'>
                                    <div className='companyCreate-label label'>ИНН*</div>
                                    <Input className={'companyCreate-input'} value={state.company.INN}
                                           inputMode={'numeric'}
                                           onChange={handleINNChange} placeholder={'ИНН*'}/>
                                </div>

                                <div className='companyCreate-kpp'>
                                    <div className='companyCreate-label label'>КПП</div>
                                    <Input className={'companyCreate-input'} value={state.company.KPP}
                                           inputMode={'numeric'}
                                           onChange={handleKPPChange} placeholder={'КПП'}/>
                                </div>

                                <div className='companyCreate-ogrn'>
                                    <div className='companyCreate-label label'>ОГРНИП/ОГРН</div>
                                    <Input className={'companyCreate-input'} value={state.company.OGRN}
                                           inputMode={'numeric'}
                                           onChange={handleOGRNChange} placeholder={'ОГРНИП/ОГРН'}/>
                                </div>

                                <div className='companyCreate-ogrn-date'>
                                    <div className='companyCreate-label label'>Дата выдачи ОГРНИП/ОГРН</div>
                                    <Input className={'companyCreate-input'}
                                           value={state.company.OGRN_date.toLocaleDateString(navigator.language, {
                                               day: "2-digit",
                                               month: '2-digit',
                                               year: 'numeric'
                                           })}
                                           onChange={handleOGRNDateChange} placeholder={'Дата выдачи ОГРНИП/ОГРН '}/>
                                </div>

                                <div className='companyCreate-registration-date'>
                                    <div className='companyCreate-label label'>Дата регистрации</div>
                                    <Input className={'companyCreate-input'}
                                           value={state.company.created_at.toLocaleTimeString(navigator.language, {
                                               day: "2-digit",
                                               month: '2-digit',
                                               year: 'numeric'
                                           })}
                                           onChange={handleCompanyDateChange} placeholder={'Дата регистрации'}/>
                                </div>

                                <div className='companyCreate-ur-address'>
                                    <div className='companyCreate-label label'>Юридический адрес</div>
                                    <Input className={'companyCreate-input'} value={state.company.ur_address}
                                           onChange={handleUR_AddressChange} placeholder={'Юридический адрес'}/>
                                </div>

                                <div className='companyCreate-fiz-address'>
                                    <div className='companyCreate-label label'>Фактический адрес</div>
                                    <Input className={'companyCreate-input'} value={state.company.fizics_address}
                                           onChange={handleFiz_AddressChange} placeholder={'Фактический адрес'}/>
                                </div>

                                <div className='companyCreate-tax'>
                                    <div className='companyCreate-label label'>Система налогооблажения</div>
                                    <Select></Select>
                                </div>
                            </div>

                        </Accordion>
                        <Accordion className='companyCreate-bank' title='Банковские реквизиты'>
                            <div className='companyCreate-bank-content'>

                                <div className='companyCreate-bik'>
                                    <div className='companyCreate-label label'>БИК</div>
                                    <Input className={'companyCreate-input'} value={state.company.BIK}
                                           onChange={handleBIKChange} placeholder={'БИК'}/>
                                </div>

                                <div className='companyCreate-invoice'>
                                    <div className='companyCreate-label label'>Расчетный счет</div>
                                    <Input className={'companyCreate-input'} value={state.company.invoiceNumber}
                                           onChange={handleInvoiceChange} placeholder={'Расчетный счет'}/>
                                </div>

                                <div className='companyCreate-cresp-invoice'>
                                    <div className='companyCreate-label label'>Кор. счет</div>
                                    <Input className={'companyCreate-input'}
                                           value={state.company.correspondentInvoiceNumber}
                                           onChange={handleCorpInvoiceChange} placeholder={'Кор. счет'}/>
                                </div>

                                <div className='companyCreate-bankName'>
                                    <div className='companyCreate-label label'>Название банка</div>
                                    <Input className={'companyCreate-input'} value={state.company.bankName}
                                           onChange={handleBankNameChange} placeholder={'Название банка'}/>
                                </div>
                            </div>

                        </Accordion>
                    </div>
                </Wrapper.Content>
                <Wrapper.Footer>
                    <div className='companyCreate-buttons'>
                        <Button variant={'active'} onClick={handleCreateButtonClick}>Создать</Button>
                        <Button variant={'cancel'} onClick={onCancel}>Отмена</Button>
                    </div>
                </Wrapper.Footer>
            </Wrapper>
        </Modal>
    );
}
